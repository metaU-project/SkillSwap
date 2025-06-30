
import FilterBar from "../components/Filters/FilterBar";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar";
import PostList from "../components/Post/PostList";
import { useState } from "react";

const LandingPage = () => {
  const [filter, setFilter] = useState("Recommended");

  const samplePosts = [
    { id: 1, title: "Learn Guitar", description: "Beginner lessons", category: "Music", type: "OFFER", location: "MPK", userName: "Alex", imageUrl: "https://picsum.photos/200/300", numReviews: 5,rating: 4.5 },
    { id: 2, title: "Need help with SQL", description: "Looking for basic SQL tutoring", category: "Coding", type: "REQUEST", location: "Remote", userName: "Wellington", imageUrl: "https://picsum.photos/200" , numReviews: 5, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 3, title: "Yoga for Beginners", description: "Join our online yoga class", category: "Fitness", type: "OFFER", location: "Remote", userName: "Samantha", imageUrl: "https://picsum.photos/201/300", numReviews: 5, rating: 4.5 ,createdAt: "2023-10-01T00:00:00.000Z" },
    { id: 4, title: "Photography Tips", description: "Seeking advice on landscape photography", category: "Photography", type: "REQUEST", location: "NYC", userName: "Jordan", imageUrl: "https://picsum.photos/202/300" , numReviews: 5, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 5, title: "Cooking Italian Cuisine", description: "Offering a class on making pasta", category: "Cooking", type: "OFFER", location: "SF", userName: "Giovanni", imageUrl: "https://picsum.photos/203/300" , numReviews: 50, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 6, title: "Web Development Mentor", description: "Looking for a mentor in web development", category: "Coding", type: "REQUEST", location: "Remote", userName: "Chris", imageUrl: "https://picsum.photos/204/300", numReviews: 5, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 7, title: "Art Workshop", description: "Join our weekend art workshop", category: "Art", type: "OFFER", location: "LA", userName: "Emily", imageUrl: "https://picsum.photos/205/300", numReviews: 5,  rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 8, title: "Spanish Language Exchange", description: "Looking for a language exchange partner", category: "Language", type: "REQUEST", location: "Remote", userName: "Carlos", imageUrl: "https://picsum.photos/206/300", numReviews: 59, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 9, title: "Digital Marketing Strategies", description: "Offering a seminar on digital marketing", category: "Business", type: "OFFER", location: "Remote", userName: "Taylor", imageUrl: "https://picsum.photos/207/300", numReviews: 5, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z"  },
    { id: 10, title: "Gardening Tips", description: "Need advice on starting a vegetable garden", category: "Gardening", type: "REQUEST", location: "Austin", userName: "Morgan", imageUrl: "https://picsum.photos/208/300", numReviews: 5, rating: 4.5,createdAt: "2023-10-01T00:00:00.000Z" },
];

  return (
    <div>
      <NavBar />
      <FilterBar filter={filter} setFilter={setFilter}/>
      <PostList posts={samplePosts} />
      <Footer />
    </div>
  );
}

export default LandingPage;
