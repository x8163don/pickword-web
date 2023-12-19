import {Spinner} from "@material-tailwind/react";

export default function Loading(){
    return <div className="w-full h-full flex items-center justify-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
}