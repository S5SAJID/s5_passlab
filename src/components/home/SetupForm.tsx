import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserInfo } from '@/lib/types'


export default function SetupForm({ onComplete }: { onComplete: (info: UserInfo) => void }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [favNumber, setFavNumber] = useState('')
    const [separator, setSeparator] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onComplete({ firstName, lastName, favNumber, separator })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="favNumber">Favorite Number (max 4 digits)</Label>
                <Input
                    id="favNumber"
                    type="number"
                    max="9999"
                    maxLength={4}
                    value={favNumber}
                    onChange={(e) => setFavNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="separator">Separator</Label>
                <Select onValueChange={setSeparator} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a separator" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="@">@</SelectItem>
                        <SelectItem value="#">#</SelectItem>
                        <SelectItem value="$">$</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit">Next</Button>
        </form>
    )
}