import { StoredPassword } from "@/lib/types";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StoredPasswordsTable({ passwords }: { passwords: StoredPassword[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Website</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {passwords.map((pw, index) => (
          <TableRow key={index}>
            <TableCell className="capitalize">{pw.website}</TableCell>
            <TableCell>{pw.category}</TableCell>
            <TableCell>
              <Input type="password" value={pw.password} readOnly />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}