

const Login = {
    load:()=>{
        return `
    <div class="px-8 mt-2 text-left bg-white shadow-lg md:w-[35vw] lg:w-[35vw] sm:w-1/3">
        <div class="flex justify-center ">
        </div>
        <h3 class="exists text-2xl font-bold text-center">Join us</h3>
        <form class="signup">
            <div class="mt-4">
                <div class="mt-4">
                    <label class="block" for="email">Email<label>
                    <input type="email" placeholder="Email" name="email" 
                                class="email w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" required>
                </div>
                <div class="mt-4">
                    <label class="block">Password<label>
                            <input type="password" placeholder="Password" name="password" autocomplete="on"
                                class="password w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" required>
                </div>

                <div class="mt-4">
                    <label class="block">Confirm Password<label>
                            <input type="password" placeholder="Password" name="confirm" 
                                class="confirm w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" required>
                </div>
                <span class="checker text-xs text-red-400"></span>
                <div class="flex">
                    <button type="submit" class="submit w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                        Account</button>
                </div>
                <div class="m-3 text-grey-dark">
                    Already have an account?
                    <a class="text-blue-600 hover:underline" href="#">
                       <span class="link-login">Login</span> 
                    </a>
                </div>
            </div>
        </form>
    </div>
</div>
`
    }
}

export default Login