import Forma from "../UI/Forma";
import Title from "../UI/Title";

export default function LogIn(){
    const logInList = {
        initialvalues: {user_login: '', user_password: ''},
        fieldlist: [
            ['user_login', 'ваш логин'], ['user_password', 'ваш пароль']
        ],
        action: 'login',
    }
    return (
        <>
            <Title text={'Log in'} />
            <Forma items={logInList} typeOfForm={'login'} />
        </>
    )
}