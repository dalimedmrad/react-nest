import { Button } from '../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { LoginSchema, LoginValues } from '../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../hook'
import { LoginAction } from '../redux/actions/auth'
import { useToast } from '../components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  })
  const dispatch = useAppDispatch();
  const { toast } = useToast()
  const navigate = useNavigate()

  const OnSubmit = (values: LoginValues) => {
    dispatch(LoginAction({ data: values })).unwrap().then((res) => navigate("/profile")).catch(err => {
      toast({
        title: "Failed Request",
        description: err,
        variant: "destructive"
      })
    })
  }
  return (
    <div className='flex flex-col gap-y-4 w-[500px] mx-auto mt-24'>
      <h1 className='text-2xl font-bold'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl >
                  <Input placeholder="email@live.fr" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasword</FormLabel>
                <FormControl >
                  <Input placeholder="****************" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />
          <Button type='submit' className='mt-4'>Sign in</Button>
        </form>
      </Form>

    </div>
  )
}

export default Login
