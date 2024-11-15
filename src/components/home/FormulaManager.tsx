import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { defaultFormulaItems, Formula, FormulaItem, UserInfo } from '@/lib/types'

export default function FormulaManager({ userInfo, onComplete }: { userInfo: UserInfo, onComplete: (email: string, formula: Formula) => void }) {
	const [email, setEmail] = useState('')
	const [formula, setFormula] = useState<Formula>([])
	const [customText, setCustomText] = useState('')

	const onDragEnd = (result: any) => {
		if (!result.destination) return

		const newFormula = Array.from(formula)
		const [reorderedItem] = newFormula.splice(result.source.index, 1)
		newFormula.splice(result.destination.index, 0, reorderedItem)

		setFormula(newFormula)
	}

	const addToFormula = (item: FormulaItem) => {
		setFormula([...formula, item])
	}

	const removeFromFormula = (index: number) => {
		const newFormula = [...formula]
		newFormula.splice(index, 1)
		setFormula(newFormula)
	}

	const addCustomText = () => {
		if (customText.trim()) {
			addToFormula({ id: `custom-${Date.now()}`, content: customText.trim() })
			setCustomText('')
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (email && formula.length > 0) {
			onComplete(email, formula)
		} else {
			alert('Please enter an email and create a formula.')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<h2 className="text-xl font-bold">Create Your Password Formula</h2>
				<p>Drag and drop items to create your custom password formula.</p>
				<div className="flex flex-wrap gap-2 my-2">
					{defaultFormulaItems.map((item: any) => (
						<Badge key={item.id} onClick={() => addToFormula(item)} className="cursor-pointer">
							{item.content}
						</Badge>
					))}
				</div>
				<div className="flex gap-2 my-2">
					<Input
						value={customText}
						onChange={(e) => setCustomText(e.target.value)}
						placeholder="Add custom text"
					/>
					<Button type="button" onClick={addCustomText}>Add</Button>
				</div>
				<div
					className="flex flex-wrap gap-2 p-4 border rounded-md min-h-[50px]"
				>
					{formula.map((item, index) => (
						<div
							className="relative"
						>
							<Badge variant="secondary">
								{item.content}
							</Badge>
							<button
								type="button"
								onClick={() => removeFromFormula(index)}
								className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>
			<Button type="submit" disabled={formula.length === 0 || !email}>Save Formula</Button>
		</form>
	)
}