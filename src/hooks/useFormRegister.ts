import React, { useEffect, useState } from "react"



export const useFormRegister = <F>(state: F, cb = (fields: F) => { }) => {
    const [fields, setFields] = useState(state)
    const handelChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const filed = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFields({ ...fields, [filed]: value })
    }
    useEffect(() => {
        let isMount = true
        if (isMount === true) {
            isMount = false
            return
        }
        cb(fields)
    }, [fields])

    cb(fields)
    const register = (filed: string) => {
        return {
            name: filed,
            id: filed,
            value: fields[filed as keyof F],
            onChange: handelChange
        }
    }
    return { fields, register }
}