import { Button } from "../ui/button";

export default function OnboardingComplete({ onComplete }: { onComplete: () => void }) {
	return (
		<div className="text-center space-y-4">
			<h2 className="text-2xl font-bold">Setup Complete!</h2>
			<p>You're all set to start generating and managing your passwords.</p>
			<Button onClick={onComplete}>Start Using Password Manager</Button>
		</div>
	)
}