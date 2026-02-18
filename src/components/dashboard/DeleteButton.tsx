"use client";

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
    action: (formData: FormData) => Promise<void>;
    id: string;
    confirmMessage?: string;
}

export function DeleteButton({ action, id, confirmMessage = "¿Estás seguro de que deseas eliminar este registro?" }: DeleteButtonProps) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!confirm(confirmMessage)) {
            e.preventDefault();
        }
    };

    return (
        <form action={action} onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <button
                type="submit"
                className="p-2 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-colors"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </form>
    );
}
