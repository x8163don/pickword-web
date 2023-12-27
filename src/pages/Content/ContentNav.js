import {IconButton, Navbar, Option, Select, Tooltip, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";


export default function ContentNav({onAddContentClick, onOrderByChange}) {

    const [orderBy, setOrderBy] = useState("id desc")
    const orderByChangeHandler = (value) => {
        setOrderBy(value)
        onOrderByChange(value)
    }

    return <Navbar className="max-w-full flex justify-between rounded-none">
        <div className="my-auto">
            <Typography variant="h6" color="gray">影片</Typography>
        </div>

        <div className="flex gap-4">
            <Tooltip content="新增影片">
                <IconButton variant="text" onClick={onAddContentClick}>
                    <PlusIcon className="w-6 h-6"/>
                </IconButton>
            </Tooltip>

            <div className="w-48">
                <Select variant="outlined" label="顯示順序" value={orderBy} onChange={orderByChangeHandler}>
                    <Option value="id desc">依加入時間(由近到遠)</Option>
                    <Option value="id asc">依加入時間(由遠到近)</Option>
                </Select>
            </div>
        </div>
    </Navbar>;
}