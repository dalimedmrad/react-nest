import { Button } from "../components/ui/button";
import { useState } from "react";
import { TwoFactorDialog } from '../components/TwoFactorDialog'
import { withAuth } from "../hoc/withAuth";
import { useAppDispatch, useAppSelector } from "../hook";
import { DisableOTPAction, GenOTPAction } from "../redux/actions/auth";
import { toast } from "../components/ui/use-toast";


const Profile = () => {
  const { id, opt_enabled } = useAppSelector(state => state.auth);
  const [open, setOpen] = useState<boolean>(false)
  const [urlOTP, setUrlOTP] = useState<string>("")
  const [secretOTP, setSecretOTP] = useState<string>("")
  const dispatch = useAppDispatch()
  const GenOTP = (id: string) => {
    dispatch(GenOTPAction({ id: id })).unwrap().then((res) => {
      setUrlOTP(res.opt_authurl);
      setSecretOTP(res.opt_secret);
      setOpen(true)
    }).catch(() => console.log("err"))
  }

  const DisableRFA = (id: string) => {
    dispatch(DisableOTPAction({ id }))
      .unwrap()
      .then((res) =>
        // toast({
        //   title: "OTP disabled",
        //   variant: "default",
        // })
        window.location.href = "/two-factor-auth"
      )
      .catch(err =>
        toast({
          title: "OTP failed",
          description: err,
          variant: "destructive",
        })
      );
  };
  return (
    <div className='mt-4 flex items-center justify-center gap-y-6 flex-col'>
      <div>
        {!opt_enabled ?
          <Button onClick={() => GenOTP(id)}>Enable 2FA</Button> :
          <Button onClick={() => DisableRFA(id)}>Disable 2FA</Button>
        }
        <TwoFactorDialog open={open} setOpen={setOpen} urlOTP={urlOTP} secretOTP={secretOTP} />
      </div>
    </div>
  )
}

export default withAuth(Profile)
