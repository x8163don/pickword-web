import {Navbar, Typography} from "@material-tailwind/react";

export default function ReviewNav() {
    return <Navbar className="max-w-full flex justify-between rounded-none">
        <div className="my-auto">
            <Typography variant="h6" color="gray">複習</Typography>
        </div>
    </Navbar>;

}