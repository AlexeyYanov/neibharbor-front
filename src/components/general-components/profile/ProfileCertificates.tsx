import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v1 as uuidv4 } from "uuid"
import { FileButton } from "../../ui/FileButton"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileUploadCertificates } from "../../../services/profile"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { PublishModalAddFile } from "../publication/PublishModalAddFile"
import { PublishAttachButton } from "../publication/PublishAttachButton"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { baseURL } from "../../../utils/config"

export const ProfileCertificates = () => {
    const navigate = useNavigate()
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const { certificatesFileName } = useAppSelector((s) => s.profileReducer)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [uploadedCertificates, setUploadedCertificates] = useState(certificatesFileName)
    const [certificates, setCertificates] = useState<File[]>([])

    useEffect(() => {
        setUploadedCertificates(certificatesFileName)
    },[certificatesFileName])

    const getFile = (f: File) => {
        setCertificates([...certificates, f])
    }

    const handlerDeleteFile = (index: number) => {
        setCertificates((s) => {
            return s.filter((item, id) => id !== index)
        })
    }

    const handlerDeleteUploadedFile = (index: number) => {
        setUploadedCertificates((s) => {
            return s.filter((item, id) => id !== index)
        })
    }

    const uploadToServerCertificates = async () => {
        try {
            let isAllFiles = true

            const formData = new FormData()
            const payload = { _id, uploadedCertificates }

            formData.append("payload", JSON.stringify(payload))
            if (certificates) {
                for (let i = 0; i < certificates.length; i++) {
                    if (!certificates[i]) {
                        continue
                    }
                    formData.append("files", certificates[i] as Blob)
                }
            }

            dispatch(setLoader(true))

            const res = await profileUploadCertificates(formData)

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))

            navigate("/profile/birth")
        } catch (error) {
            dispatch(setLoader(false))
            alert("upload file is faild" + error)
        }
    }

    console.log(certificates)

    return (
        <>
            <div className="profile__certificates">
                <div className="publish__main-list">
                    <>
                        {uploadedCertificates.map((item, index) => (
                            <div className="publish__main-list-item">
                                <button
                                    className="services__add-remove publish__main-list-item-remove"
                                    onClick={() => handlerDeleteUploadedFile(index)}
                                >
                                    <IconAdminClose />
                                </button>
                                <img
                                    src={`${baseURL}/uploads/certificates/${item}`}
                                    alt="Вибране зображення"
                                />
                            </div>
                        ))}
                    </>

                    {certificates.map((item, index) => (
                        <div className="publish__main-list-item">
                            <button
                                className="services__add-remove publish__main-list-item-remove"
                                onClick={() => handlerDeleteFile(index)}
                            >
                                <IconAdminClose />
                            </button>
                            <img
                                src={URL.createObjectURL(item)}
                                alt="Вибране зображення"
                            />
                        </div>
                    ))}
                    <PublishAttachButton onClick={() => setIsOpen(true)} />
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater`}
                onClick={uploadToServerCertificates}
            >
                Continue
            </button>
            <PublishModalAddFile
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                getFile={getFile}
            />
        </>
    )
}

;<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    <div style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}></div>
    </div>
    <div>
        <div></div>
    </div>
</div>
