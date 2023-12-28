import {IconButton, Input, Navbar, Option, Select, Tooltip, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";


export default function WordNav({onSearchTextChange}) {

    return <Navbar className="max-w-full flex justify-between rounded-none">
        <div className="my-auto">
            <Typography variant="h6" color="gray">字卡</Typography>
        </div>

        <div className="flex gap-4">
            <div className="w-48">
                <Input
                    icon={<MagnifyingGlassIcon className="w-5 h-5"/>}
                    onChange={(e) => {
                        onSearchTextChange(e.currentTarget.value)
                    }}/>
            </div>
        </div>
    </Navbar>;
}