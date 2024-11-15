import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, StoredPassword } from '@/lib/types'

export default function PasswordStore({ storedPasswords, setStoredPasswords }: { storedPasswords: StoredPassword[], setStoredPasswords: React.Dispatch<React.SetStateAction<StoredPassword[]>> }) {
  const [website, setWebsite] = useState('')
  const [category, setCategory] = useState('')
  const [password, setPassword] = useState('')

  const addPassword = () => {
    const newPassword = { website: website.toLowerCase(), category, password }
    const updatedPasswords = [...storedPasswords, newPassword]
    setStoredPasswords(updatedPasswords)
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
    setWebsite('')
    setCategory('')
    setPassword('')
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat: string) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button onClick={addPassword}>Add Password</Button>
    </div>
  )
}
