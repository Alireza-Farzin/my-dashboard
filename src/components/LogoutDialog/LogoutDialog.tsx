"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface LogoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLogout: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, onOpenChange, onLogout }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-[#171717] border-[#fcfcfc14]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-right">
                        آیا مطمئن هستید؟
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-right">
                        آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:gap-0">
                    <AlertDialogCancel className="mt-0">انصراف</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onLogout}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        خروج
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
