import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import TwoFactor from "./TwoFactor";

interface TwoFactorDialogProps {
    open: boolean
    setOpen: (value: boolean) => void
    urlOTP: string;
    secretOTP: string;
}

export const TwoFactorDialog: FC<TwoFactorDialogProps> = ({ open, setOpen, urlOTP,
    secretOTP }) => {
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[900px]">
                <DialogHeader>
                    <DialogDescription>
                        <TwoFactor urlOTP={urlOTP} setOpen={setOpen} secretOTP={secretOTP} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    );
};