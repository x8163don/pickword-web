import {Tooltip, IconButton, ListItem, ListItemPrefix, ListItemSuffix, Typography} from "@material-tailwind/react";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

export default function ContentItem({content}) {
    let icon = <div></div>

    if (content.platform === 'Youtube') {
        icon = <img className="w-8 h-8" src="https://www.youtube.com/s/desktop/e1f38dd5/img/favicon_32x32.png"/>
    }


    return <ListItem>
        <ListItemPrefix>
            {icon}
        </ListItemPrefix>
        <div>
            <Typography variant="h6" color="blue-gray">{content.title}</Typography>
        </div>
        <ListItemSuffix>
            <IconButton variant="text">
                <Tooltip content="在新視窗中開啟">
                    <Link to={content.source_url} target="_blank" rel="noopener noreferrer">
                        <ArrowTopRightOnSquareIcon className="w-6 h-6"/>
                    </Link>
                </Tooltip>
            </IconButton>
        </ListItemSuffix>
    </ListItem>
}