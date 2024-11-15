'use client'

import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Formula, FormulaSet, StoredPassword, UserInfo } from '@/lib/types'
import StoredPasswordsTable from '@/components/home/PasswordTable'
import PasswordStore from '@/components/home/StorePassword'
import PasswordGenerator from '@/components/home/PasswordGenerator'
import OnboardingComplete from '@/components/home/OnboardingComplete'
import FormulaManager from '@/components/home/FormulaManager'
import ThemeToggle from '@/components/home/ThemeToggle'
import WelcomeScreen from '@/components/home/WelcomeScreen'
import SetupForm from '@/components/home/SetupForm'


export default function PasswordManager() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [formulaSet, setFormulaSet] = useState<FormulaSet>({})
  const [storedPasswords, setStoredPasswords] = useState<StoredPassword[]>([])
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    const storedFormulaSet = localStorage.getItem('formulaSet')
    const storedPasswords = localStorage.getItem('passwords')
    if (storedUserInfo && storedFormulaSet) {
      setUserInfo(JSON.parse(storedUserInfo))
      setFormulaSet(JSON.parse(storedFormulaSet))
      setOnboardingStep(4) // Skip onboarding if data exists
    }
    if (storedPasswords) {
      setStoredPasswords(JSON.parse(storedPasswords))
    }
  }, [])

  const handleSetupComplete = (info: UserInfo) => {
    setUserInfo(info)
    localStorage.setItem('userInfo', JSON.stringify(info))
    setOnboardingStep(2)
  }

  const handleFormulaComplete = (email: string, newFormula: Formula) => {
    setFormulaSet(prev => {
      const updated = { ...prev, [email]: newFormula }
      localStorage.setItem('formulaSet', JSON.stringify(updated))
      return updated
    })
    setOnboardingStep(3)
  }

  const completeOnboarding = () => {
    setOnboardingStep(4)
  }

  const filteredPasswords = storedPasswords.filter(pw =>
    pw.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pw.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto pt-5">
      <Card className='border-none shadow-none'>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Password Manager</CardTitle>
              <CardDescription>Generate and store secure passwords</CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent>
          {onboardingStep < 4 && (
            <div className="mb-4">
              <Progress value={(onboardingStep / 3) * 100} className="w-full" />
            </div>
          )}
          {onboardingStep === 0 && <WelcomeScreen onNext={() => setOnboardingStep(1)} />}
          {onboardingStep === 1 && <SetupForm onComplete={handleSetupComplete} />}
          {onboardingStep === 2 && userInfo && (
            <FormulaManager userInfo={userInfo} onComplete={handleFormulaComplete} />
          )}
          {onboardingStep === 3 && (
            <OnboardingComplete onComplete={completeOnboarding} />
          )}
          {onboardingStep === 4 && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    placeholder="Search passwords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Generate</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate Password</DialogTitle>
                      <DialogDescription>Create a new password using your formula.</DialogDescription>
                    </DialogHeader>
                    <PasswordGenerator 
                      userInfo={userInfo!} 
                      formulaSet={formulaSet} 
                      storedPasswords={storedPasswords} 
                      setStoredPasswords={setStoredPasswords}
                    />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button><Plus className="mr-2" /> Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Password</DialogTitle>
                      <DialogDescription>Store a new password.</DialogDescription>
                    </DialogHeader>
                    <PasswordStore storedPasswords={storedPasswords} setStoredPasswords={setStoredPasswords} />
                  </DialogContent>
                </Dialog>
              </div>
              <StoredPasswordsTable passwords={filteredPasswords} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}