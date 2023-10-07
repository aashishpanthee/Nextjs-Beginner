
export default function UserProfile({params}:any){
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-3xl">Profile
            <span className="bg-orange-400 text-3xl">{params.id}</span>
            </h1>
        </div>
    )
}