const customerTestimonials = [
    {
        opinion: "JHU Ramen truly exceeded my expectations! The atmosphere is cozy and welcoming, and the ramen is simply divine. Every bite reflects the care and expertise put into it. Can't wait to return!",
        name: "Alex Johnson",
        imageSrc: "human1.jpg",
    },
    {
        opinion: "Absolutely in love with JHU Ramen! The service was impeccable, and the ramen was the best I've ever had. The flavors are unmatched, and the ambiance makes every visit special. A must-try for anyone!",
        name: "Samantha Lee",
        imageSrc: "human2.jpg",
    },
    {
        opinion: "The attention to detail at JHU Ramen is outstanding. From the warm welcome to the delicious, authentic ramen, it's clear they value every customer. A flawless dining experience!",
        name: "Michael Nguyen",
        imageSrc: "human3.jpg",
    },
    {
        opinion: "JHU Ramen offers a culinary journey like no other. The broth is rich and flavorful, and the noodles are perfectly chewy. It's my go-to spot for comfort food done right.",
        name: "Jessica Kim",
        imageSrc: "human4.jpg",
    },
    {
        opinion: "JHU Ramen has captured my heart! The quality of the ingredients and the skill of the chefs shine through in every bowl. It's not just food; it's a masterpiece of flavor.",
        name: "Emily Patel",
        imageSrc: "human5.jpg",
    },
    {
        opinion: "Every visit to JHU Ramen is a delight. The ambiance sets the perfect stage for their exceptional ramen, which is consistently delicious. Highly recommend for an unforgettable dining experience.",
        name: "Carlos Garcia",
        imageSrc: "human6.jpg",
    }
];

const testimonialsHTML = customerTestimonials.map(testimonial => `
    <div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <div class="card-text" style="height: 235px; width: 100%; display: block;">
                <p class="card-text-opinion">${testimonial.opinion}<br></p>
                <p class="card-text-name">${testimonial.name}</p>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <img class="card-img-top profile-image" src="${testimonial.imageSrc}" alt="customer" data-holder-rendered="true">
                </div>
            </div>
        </div>
    </div>
`).join('');

// Assuming you have a container with the class 'row' inside a container with the class 'container'
document.querySelector('.container > .row').innerHTML = testimonialsHTML;
