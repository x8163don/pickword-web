import {Button, Card, CardBody, Typography} from "@material-tailwind/react";

export default function Dashboard() {
    return <main className="mx-auto max-w-5xl min-w-[64rem] pt-16">
        <div className="flex">
            <Card className="bg-gray-100">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">Title</Typography>
                    <Button variant="outlined"><img src="" alt="mean"/></Button>
                    <Button variant="outlined"><img src="" alt="mean"/></Button>
                    <Button variant="outlined"><img src="" alt="mean"/></Button>

                </CardBody>
            </Card>

            <Card className="bg-gray-100">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2"> Title</Typography>
                </CardBody>
            </Card>
        </div>

    </main>
}