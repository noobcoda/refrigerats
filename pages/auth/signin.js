import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn({ providers }) {
    return (
      <>

        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="shadow-2xl">
            <button onClick={() => signIn(provider.id, { callbackUrl: "/home"})}
                type="button"
                className="bg-mainColor pointer-cursor p-3 flex justify-center items-center rounded-lg outline-none"
                //onClick={signIn}
              >
                <FcGoogle className="mr-4"/> Sign in with Google
            </button>
          </div>
        ))}
      </>
    )
  }

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers 
        }
    }
}