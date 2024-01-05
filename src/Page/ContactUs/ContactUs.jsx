import toast from "react-hot-toast";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const ContactUs = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const formData = e.target;
        const name = formData.name.value;
        const email = formData.email.value;
        const message = formData.message.value;
        const info = {
            name,
            email,
            message
        }
        fetch('http://localhost:5000/contactUs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    toast.success('Contact added successfully');
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    return (
        <div id='contract' className="w-5/6 mx-auto mb-32 grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32  border-2 border-gray-500" >
            <div className="flex flex-col justify-between">
                <div className="space-y-2 lg:-ml-14">
                    <h2 className="text-4xl lg:text-left font-bold lg:text-5xl flex">CONTACT <span className='hidden lg:inline-block ml-4'> US</span>
                        <HiOutlinePaperAirplane className='rotate-45 ml-4' /></h2>
                </div>
                <img src="https://hkbyte.com/doodles/Contact%20Doodle.svg" alt="" className="w-full h-full animate-bounce mt-7" />
            </div>
            <form onSubmit={handleSubmit} action="" method="POST" noValidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input id="name" name='name' type="text" placeholder="" className="w-full p-3 rounded bg-gray-100 text-black font-semibold border-2 border-gray-500" />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" name='email' className="w-full p-3 rounded bg-gray-100 text-black font-semibold border-2 border-gray-500" />
                </div>
                {/* <div>
                    <label htmlFor="subject" className="text-sm ">Subject</label>
                    <input id="subject" type="text" name='subject' className="w-full p-3 rounded bg-gray-100 text-black font-semibold border-2 border-gray-500" />
                </div> */}
                <div>
                    <label htmlFor="message" className="text-sm">Message</label>
                    <textarea id="message" rows="3" name='message' className="w-full p-3 rounded bg-gray-100 text-black font-semibold border-2 border-gray-500"></textarea>
                </div>
                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded border border-gray-500 hover:bg-gray-500 text-gray-500 hover:text-white hover:scale-110 duration-500">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;