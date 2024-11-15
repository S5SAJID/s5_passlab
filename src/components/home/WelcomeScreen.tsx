import { Button } from "@/components/ui/button"

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Welcome to Password Manager</h2>
      <p>Let's set up your personalized password generation system.</p>
      <Button onClick={onNext}>Get Started</Button>
    </div>
  )
}