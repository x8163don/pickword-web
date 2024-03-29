/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
    content: ["./src/**/*.{html,js,jsx,ts,tsx}",],
    theme: {
        extend: {
            width:{
                '1/50':"2%",
                '2/50':"4%",
                '3/50':"6%",
                '4/50':"8%",
                '5/50':"10%",
                '6/50':"12%",
                '7/50':"14%",
                '8/50':"16%",
                '9/50':"18%",
                '10/50':"20%",
                '11/50':"22%",
                '12/50':"24%",
                '13/50':"26%",
                '14/50':"28%",
                '15/50':"30%",
                '16/50':"32%",
                '17/50':"34%",
                '18/50':"36%",
                '19/50':"38%",
                '20/50':"40%",
                '21/50':"42%",
                '22/50':"44%",
                '23/50':"46%",
                '24/50':"48%",
                '25/50':"50%",
                '26/50':"52%",
                '27/50':"54%",
                '28/50':"56%",
                '29/50':"58%",
                '30/50':"60%",
                '31/50':"62%",
                '32/50':"64%",
                '33/50':"66%",
                '34/50':"68%",
                '35/50':"70%",
                '36/50':"72%",
                '37/50':"74%",
                '38/50':"76%",
                '39/50':"78%",
                '40/50':"80%",
                '41/50':"82%",
                '42/50':"84%",
                '43/50':"86%",
                '44/50':"88%",
                '45/50':"90%",
                '46/50':"92%",
                '47/50':"94%",
                '48/50':"96%",
                '49/50':"98%",
                '50/50':"100%",
            }
        },
    },
    plugins: [],
})

