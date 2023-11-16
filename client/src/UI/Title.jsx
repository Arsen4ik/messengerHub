// eslint-disable-next-line react/prop-types
export default function Title({ text }){
    return (
        <h1 className="mx-auto my-10 py-1 font-bold text-5xl text-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 w-fit tracking-wider">{text}</h1>
    )
}