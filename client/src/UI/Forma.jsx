/* eslint-disable no-unused-vars */
import { Formik, Field, Form } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { RouterContext } from "../Context/RouterContext";

// eslint-disable-next-line react/prop-types
export default function Forma({ items }) {
    const { token, setTokenFunc } = useContext(RouterContext)
    // eslint-disable-next-line react/prop-types
    const { initialvalues, fieldlist, action } = items
    const [isVisible, setIsVisible] = useState(false)
    const [areInitialValues, setAreInitialValues] = useState(initialvalues)
    useEffect(() => {
        let newIsVisible = true
        for(let item in areInitialValues){
            if(!areInitialValues[item]){
                // console.log(item, areInitialValues[item]);
                newIsVisible = false
            }
        }
        // console.log(newIsVisible);
        setIsVisible(newIsVisible)
    }, [areInitialValues])
    // console.log(isVisible);
    return (
        <Formik
            initialValues={initialvalues}
            onSubmit={async (values) => {
                let response = await fetch(`http://localhost:8787/${action}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Origin": "*"
                    },
                    body: JSON.stringify({ values })
                })
                response = await response.json()
                console.log(response);
                if(response.token) {
                    await setTokenFunc(response.token);
                }
            }}
        >
            <Form className="mx-auto p-10 gap-10 flex flex-col bg-gradient-to-br from-purple-200 via-indigo-200 to-sky-200 w-1/2 rounded-md shadow-inner max-w-lg">
                {
                    // eslint-disable-next-line react/prop-types
                    fieldlist.map((registrationItem, ind) => <Field
                        // onChange={(e) => setAreInitialValues({ ...areInitialValues, areInitialValues[registrationItem[0]]: '' })}
                        // onChange={(e) => setAreInitialValues({...areInitialValues, areInitialValues[registrationItem[0]]: e.target.value})}
                        // onChange={(e) => console.log(areInitialValues[registrationItem[0]], '|', registrationItem[0], '|', areInitialValues['password'], '|', areInitialValues[registrationItem[0]] === areInitialValues['password'])}
                        className="w-full rounded-md h-10 text-lg px-2 outline-none shadow-lg"
                        key={ind} name={registrationItem[0]} type="text" placeholder={registrationItem[1]} />)
                }
                <button className="text-2xl font-bold text-indigo-500 tracking-wide hover:animate-pulse" type="submit">{action === 'login' ? 'войти' : 'зарегистрироваться'}</button>
                {
                    action === 'login' && (
                        <>
                            <div className="flex flex-row text-indigo-500 justify-center gap-5">
                                <hr className="w-full border-1 border-indigo-500 self-center" />
                                <p className="">или</p>
                                <hr className="w-full border-1 border-indigo-500 self-center" />
                            </div>
                            <Link className="w-full h-10 text-lg tracking-wide text-white shadow-lg flex justify-center items-center font-bold border-2 border-white rounded-md hover:border-indigo-500 hover:text-indigo-500" to={'/registration'}>зарегистрироваться</Link>
                        </>
                    )
                }
            </Form>
        </Formik>
    )
}