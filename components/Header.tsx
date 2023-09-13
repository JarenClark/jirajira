import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import SupabaseLogo from "@/components/SupabaseLogo";
import NextJsLogo from "@/components/NextJsLogo";
type Props = {};

async function Header({}: Props) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
//   const params = useParams()
  return (
    <header className="px-2 pt-2 pb-1 ml-64 w-[calc(100vw - 256px)] ">
      <nav className=" flex rounded-lg justify-between m-2 bg-slate-900 border border-slate-700 h-16">
        <div className="w-full  flex justify-between items-center px-5 p-3 text-sm text-foreground">
          {/* <pre>{JSON.stringify(params)}</pre> */}
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4 ">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
