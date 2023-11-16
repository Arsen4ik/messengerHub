import Forma from "../UI/Forma";
import Title from "../UI/Title";
import { Link } from "react-router-dom"

export default function Registration() {
    const registrationList = {
        initialvalues: {user_login: '', user_password: '', user_password2: '', user_firstname: '', user_lastname: ''},
        fieldlist: [
            ['user_login', 'придумайте логин'], ['user_password', 'придумайте пароль'], ['user_password2', 'повторите пароль'],
            ['user_firstname', 'ваше имя'], ['user_lastname', 'ваша фамилия']
        ],
        action: 'registration',
    }
    console.log(window.location.pathname);
    return (
        <>
            <Link className="absolute flex flex-row gap-5 items-center px-5 hover:animate-pulse" to={'/'}>
                <img className="w-10 h-10" src="/arrow-left.svg" alt="" />
                <p className="text-xl font-bold text-indigo-500">back</p>
            </Link>  
            <Title text={'Registration'} />
            {/* eslint-disable-next-line no-constant-condition */}
            {5 > 3 ? <Forma items={registrationList} /> : window.location.pathname = '/'}
        </>
    )
}