import { useState } from "react"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { Link, Route, Routes } from "react-router-dom"
import ServicesAll from "./ServicesAll"
import ServicesAdd from "./ServicesAdd"
import ServicesSub from "./ServicesSub"
import ServicesFavor from "./ServicesFavor"
import { Loader } from "../../ui/Loader"
import { useAppSelector } from "../../../utils/hooks"

const Services = () => {
    const { isLoad } = useAppSelector((s) => s.categoriesReducer)

    return (
        <>
            <div className="admin">
                <Routes>
                    <Route path="servicessub" element={<ServicesSub />} />
                    <Route path="favor" element={<ServicesFavor />} />
                    <Route path="servicesadd" element={<ServicesAdd />} />
                    <Route path="" element={<ServicesAll />} />
                </Routes>
            </div>
            {isLoad && <Loader />}
        </>
    )
}

export default Services
