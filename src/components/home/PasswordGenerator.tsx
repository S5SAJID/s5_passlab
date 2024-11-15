import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, FormulaSet, StoredPassword, UserInfo } from '@/lib/types'

export default function PasswordGenerator({ userInfo, formulaSet, storedPasswords, setStoredPasswords }: { userInfo: UserInfo, formulaSet: FormulaSet, storedPasswords: StoredPassword[], setStoredPasswords: React.Dispatch<React.SetStateAction<StoredPassword[]>> }) {
  const [email, setEmail] = useState('')
  const [websiteName, setWebsiteName] = useState('')
  const [category, setCategory] = useState('')
  const [generatedPassword, setGeneratedPassword] = useState('')

  const generatePassword = () => {
    if (!email || !websiteName || !category) {
      alert("Please enter email, website name, and category before generating a password.");
      return;
    }

    const formula = formulaSet[email]
    if (!formula) {
      alert("No formula found for this email. Please create a formula first.");
      return;
    }

    let password = ''
    formula.forEach((item) => {
      switch (item.id) {
        case 'fl':
          password += userInfo.firstName[0]
          break
        case 'website':
          password += websiteName.toLowerCase()
          break
        case 'category':
          password += category.toLowerCase()
          break
        case 'separator':
          password += userInfo.separator
          break
        case 'firstname':
          password += userInfo.firstName
          break
        case 'favnumber':
          password += userInfo.favNumber
          break
        default:
          if (item.id.startsWith('custom-')) {
            password += item.content
          }
      }
    })
    setGeneratedPassword(password)
  }

  const savePassword = () => {
    if (generatedPassword) {
      const newPassword = { website: websiteName.toLowerCase(), category, password: generatedPassword }
      const updatedPasswords = [...storedPasswords, newPassword]
      setStoredPasswords(updatedPasswords)
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords))
      alert('Password saved successfully!')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Select onValueChange={setEmail} required>
          <SelectTrigger>
            <SelectValue placeholder="Select an email" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(formulaSet).map((email) => (
              <SelectItem key={email} value={email}>{email}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="websiteName">Website Name</Label>
        <Input
          id="websiteName"
          value={websiteName}
          onChange={(e) => setWebsiteName(e.target.value)}
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
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={generatePassword}>Generate Password</Button>
      {generatedPassword && (
        <div className="space-y-2">
          <Label htmlFor="generatedPassword">Generated Password</Label>
          <div className="flex space-x-2">
            <Input id="generatedPassword" value={generatedPassword} readOnly className="flex-grow" />
            <Button onClick={() => navigator.clipboard.writeText(generatedPassword)}>Copy</Button>
          </div>
          <Button onClick={savePassword}>Save Password</Button>
        </div>
      )}
    </div>
  )
}
