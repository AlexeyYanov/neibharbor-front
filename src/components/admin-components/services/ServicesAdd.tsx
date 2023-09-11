import { useEffect, useState } from "react"
import { FileButton } from "../../ui/FileButton"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { useNavigate } from "react-router"
import $api from "../../../http"
import { v4 as uuidv4 } from "uuid"
import { removeFile } from "../../../utils"
import { useSearchParams } from "react-router-dom"

interface CategoryInterface {
    id: string
    name: string
    file: File
}

const categoryBody = {
    id: "",
    name: "",
    file: null as any,
}

const ServicesAdd = () => {
    const [category, setCategory] = useState({ ...categoryBody, id: uuidv4() })
    const navigate = useNavigate()
    const [listSubCategory, setListSubCategory] = useState<CategoryInterface[]>(
        []
    )
    const [searchParams] = useSearchParams()

    const [idCategories, setIdCategorise] = useState("")

    const addSubCategory = () => {
        setListSubCategory((s) => [...s, { ...categoryBody, id: uuidv4() }])
    }

    const changeItemSubName = ({
        index,
        name,
    }: {
        index: number
        name: string
    }) => {
        setListSubCategory((s) => {
            return s.map((item, id) =>
                id === index ? { ...item, name } : item
            )
        })
    }

    const changeItemSubFile = ({
        index,
        file,
    }: {
        index: number
        file: File
    }) => {
        setListSubCategory(
            listSubCategory.map((item, id) =>
                id === index ? { ...item, file } : item
            )
        )
    }

    // Поиск айди для определения,
    // нужно ли создать новую категорию,
    // или добавить в уже существующую новую.
    useEffect(() => {
        const id = searchParams.get("id")
        setIdCategorise(id || "")
        if (id) {
            addSubCategory()
        }
    }, [])

    const addNewCategory = async () => {
        try {
            const formData = new FormData()

            for (let i = 0; i < listSubCategory.length; i++) {
                formData.append(
                    "files",
                    listSubCategory[i].file,
                    listSubCategory[i].id
                )
            }

            // Также формируется FormData
            // для отправки на создание новой категории
            // или добавление новой подкатегории к существующей.
            const payload = {
                category: !idCategories
                    ? { id: category.id, name: category.name }
                    : { id: idCategories },
                subCategory: {
                    listSubCategory: listSubCategory.map((it) => ({
                        id: it.id,
                        name: it.name,
                    })),
                },
            }
            formData.append("payload", JSON.stringify(payload))
            if (idCategories) {
                await $api.post("categories/add-sub-categories", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
            } else {
                formData.append("files", category.file, category.id)

                await $api.post("categories/add-categories", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
            }

            setCategory({ ...categoryBody, id: uuidv4() })
            setListSubCategory([])
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <div className="ui-admin__subheader">
                <div className="ui-admin__subheader-title">
                    <div
                        className="services__exit"
                        onClick={() => navigate(-1)}
                    >
                        <button>
                            <IconLeftChevrons />
                        </button>
                        <h6>Add Service Category</h6>
                    </div>
                </div>
            </div>
            <div className="services__add">
                {!idCategories ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="services__add-input"
                            value={category.name}
                            onChange={(e) =>
                                setCategory((s) => ({
                                    ...s,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <FileButton
                            getFile={(file: File) => {
                                console.log("file", file)

                                setCategory((s) => ({ ...s, file: file }))
                            }}
                            image={category.file}
                        />
                    </div>
                ) : (
                    <></>
                )}
                {listSubCategory.map((item, index) => {
                    return (
                        <div>
                            <input
                                type="text"
                                placeholder="Sub Category Name"
                                className="services__add-input"
                                value={item.name}
                                onChange={(e) =>
                                    changeItemSubName({
                                        index,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <FileButton
                                getFile={(file: File) =>
                                    changeItemSubFile({ index, file })
                                }
                                image={item.file}
                            />
                        </div>
                    )
                })}
                <button
                    onClick={addSubCategory}
                    className="services__add-button services__add-button--white services__add-button-1"
                >
                    Add SubCategory
                </button>
                <button
                    className="services__add-button services__add-button-2"
                    onClick={addNewCategory}
                >
                    Publish
                </button>
            </div>
        </>
    )
}

export default ServicesAdd
