import { type Mail } from "@/lib/data"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { ComponentProps } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedEmail } from "@/redux/userSlice"
import { RootState } from "@/redux/store"

interface MailListProps {
    items: Mail[]
}
const MailList = ({ items }: MailListProps) => {

    const dispatch = useDispatch();
    const { selectedEmail } = useSelector((state: RootState) => state.user)

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            selectedEmail?.id === item.id && "bg-muted"
                        )}
                        onClick={() =>
                            dispatch(setSelectedEmail({
                                ...selectedEmail,
                                id: item.id
                            }))
                        }
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold">{item.name}</div>
                                    {!item.read && (
                                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "ml-auto text-xs",
                                        selectedEmail?.id === item.id
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <div>
                                        <h1>{item.date.split('T')[0]}</h1>
                                        <h1>{item.date.split('T')[1].slice(0, item.date.split('T')[1].length - 3)}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs font-medium">{item.subject}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                            {item.text.substring(0, 300)}
                        </div>
                        {item.labels.length ? (
                            <div className="flex items-center gap-2">
                                {item.labels.map((label) => (
                                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        ) : null}
                    </button>
                ))}
            </div>
        </ScrollArea>
    )
}

function getBadgeVariantFromLabel(
    label: string
): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
        return "default"
    }

    if (["personal"].includes(label.toLowerCase())) {
        return "outline"
    }

    return "secondary"
}

export default MailList

