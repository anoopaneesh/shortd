import { Button } from "@chakra-ui/react"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { PropsWithChildren } from "react"

type DeleteDialogProps = {
    title: string
    body: string
    primaryActionText: string
    secondaryActionText: string
    onPrimaryClick: (...props: any) => any
    onSecondaryClick?: (...props: any) => any | null
}

const DeleteDialog: React.FC<PropsWithChildren<DeleteDialogProps>> = ({ children, title, body, primaryActionText, secondaryActionText, onSecondaryClick, onPrimaryClick }) => {
    return (
        <DialogRoot role="alertdialog">
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        {body}
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">{secondaryActionText}</Button>
                    </DialogActionTrigger>
                    <Button colorPalette="red" onClick={onPrimaryClick}>{primaryActionText}</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}

export default DeleteDialog