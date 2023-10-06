import { IconPicker, IconStars } from "../../svg/IconFavor"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { Modal } from "../../ui/Modal"
import { IconBoxComment, IconMicrophone } from "../../svg/IconActivitiesModal"
import { baseURL } from "../../../utils/config"
import { ROLES } from "../../../types/enum"
import { useState } from "react"

const list = [ROLES.ADMIN, ROLES.COORDINATORS, ROLES.USER]

export const UserItemModal = ({
    role,
    avatarFileName,
    fullName,
    openChat,
    isOpen,
    setIsOpen,
    handlerBlockUser,
    handlerDeleteUser,
    changeRole,
}: {
    role: ROLES
    avatarFileName: string | null | undefined
    fullName: string
    isOpen: boolean
    openChat: () => void
    setIsOpen: (o: boolean) => void
    handlerBlockUser: () => void
    handlerDeleteUser: () => void
    changeRole: (r: ROLES) => void
}) => {
    const [isOpenRoleList, seIsOpenRoleList] = useState(false)

    return (
        <div
            className={`activities__favor-modal ${
                isOpen ? "activities__favor-modal--open" : ""
            }`}
        >
            <Modal setIsOpen={setIsOpen}>
                <div className="activities__favor-modal-body">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(false)
                        }}
                        className="activities__favor-modal-linebody"
                    >
                        <button className="activities__favor-modal-line" />
                    </div>
                    <div className="user__modal">
                        <div className="user__modal-avatar">
                            <img
                                src={`${baseURL}/uploads/avatar/${avatarFileName}`}
                                alt=""
                                className="user__modal-avatar-img"
                            />
                            <h6 className="user__modal-avatar-title">
                                Actions with <b>{fullName}</b>
                            </h6>
                        </div>
                    </div>
                    <div className="user__modal-body">
                        <div className="user__modal-body-row1">
                            <IconPicker />
                            <div>
                                <button>Map</button>
                            </div>
                            <button className="user__modal-body-row1-edit">
                                Edit
                            </button>
                        </div>

                        <div
                            className="user__modal-body-row1"
                            onClick={() => seIsOpenRoleList((s) => !s)}
                        >
                            <IconPicker />
                            <div>
                                <button>Role</button>
                            </div>
                            <button className="user__modal-body-row1-coord">
                                {role}
                            </button>
                        </div>
                        {isOpenRoleList && (
                            <div className="user__modal-body-role">
                                {list.map((item) => (
                                    <button onClick={() => changeRole(item)}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="user__modal-body-row1">
                            <IconPicker />
                            <div>
                                <button>Coordinator</button>
                            </div>
                            <button className="user__modal-body-row1-coord">
                                Coordinator Name
                            </button>
                        </div>

                        <div
                            className="user__modal-body-row2"
                            onClick={openChat}
                        >
                            <IconPicker />
                            <div>
                                <button>Write messege</button>
                            </div>
                        </div>

                        <div className="user__modal-body-row2">
                            <IconPicker />
                            <div>
                                <button>Write Email</button>
                            </div>
                        </div>

                        <div
                            className="user__modal-body-row2"
                            onClick={handlerBlockUser}
                        >
                            <IconPicker />
                            <div>
                                <button>Block</button>
                            </div>
                        </div>

                        <div
                            className="user__modal-body-row2"
                            onClick={handlerDeleteUser}
                        >
                            <IconPicker />
                            <div>
                                <button>
                                    Delete <b>Username</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
