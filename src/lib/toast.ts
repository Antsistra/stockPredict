import { useToast as useToastPrimitive } from "@/components/ui/use-toast"

export function useToast() {
    const { toast } = useToastPrimitive()

    const showSuccess = (message: string) => {
        toast({
            title: "Success",
            description: message,
            variant: "default",
        })
    }

    const showError = (message: string) => {
        toast({
            title: "Error",
            description: message,
            variant: "destructive",
        })
    }

    return {
        showSuccess,
        showError,
    }
} 