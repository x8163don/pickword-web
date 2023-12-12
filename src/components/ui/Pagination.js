import {Button, IconButton} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

export function Pagination({current = 1, total = 1, to}) {

    const getItemProps = (index) =>
        ({
            variant: current === index ? "filled" : "text",
            color: "gray",
            onClick: () => toHandler(index),
        });

    const nextHandler = () => {
        if (current === total) return;
        to(current + 1)
    };

    const prevHandler = () => {
        if (current === 1) return;
        to(current - 1)
    };

    const toHandler = (index) => {
        if (current == index) return;
        to(index)
    }

    const calculatePages = () => {
        let start = current <= 2 ? 1 : current - 2;
        let end = start + 4 > total ? total : start + 4;
        return Array.from({length: end - start + 1}, (_, i) => start + i)
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prevHandler}
                disabled={current === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/>
            </Button>
            <div className="flex items-center gap-2">
                {
                    calculatePages().map((item) => {
                        return <IconButton key={item} {...getItemProps(item)}>{item}</IconButton>
                    })
                }
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={nextHandler}
                disabled={current >= total}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
            </Button>
        </div>
    );
}