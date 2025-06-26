import { login, signup } from '@/app/(auth)/login/actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <form className="flex flex-col gap-4 p-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        <Button formAction={login}>Log in</Button>
        <Button formAction={signup} variant="outline">
          Sign up
        </Button>
      </form>
    </Card>
  )
}
