import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

// Layouts (keep normal imports)
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import ProtectedRoute from "./protectedRoutes";

// Lazy loaded pages
const DashboardOverview1 = lazy(() => import("../views/dashboard-overview-1/Main"));
const DashboardOverview2 = lazy(() => import("../views/dashboard-overview-2/Main"));
const DashboardOverview3 = lazy(() => import("../views/dashboard-overview-3/Main"));
const DashboardOverview4 = lazy(() => import("../views/dashboard-overview-4/Main"));

const Categories = lazy(() => import("../views/categories/Main"));
const AddProduct = lazy(() => import("../views/add-product/Main"));
const ProductList = lazy(() => import("../views/product-list/Main"));
const ProductGrid = lazy(() => import("../views/product-grid/Main"));
const TransactionList = lazy(() => import("../views/transaction-list/Main"));
const TransactionDetail = lazy(() => import("../views/transaction-detail/Main"));
const SellerList = lazy(() => import("../views/seller-list/Main"));
const SellerDetail = lazy(() => import("../views/seller-detail/Main"));

const Inbox = lazy(() => import("../views/inbox/Main"));
const FileManager = lazy(() => import("../views/file-manager/Main"));
const PointOfSale = lazy(() => import("../views/point-of-sale/Main"));
const Chat = lazy(() => import("../views/chat/Main"));
const Post = lazy(() => import("../views/post/Main"));
const Calendar = lazy(() => import("../views/calendar/Main"));

const CrudDataList = lazy(() => import("../views/crud-data-list/Main"));
const CrudForm = lazy(() => import("../views/crud-form/Main"));

const UsersLayout1 = lazy(() => import("../views/users-layout-1/Main"));
const UsersLayout2 = lazy(() => import("../views/users-layout-2/Main"));
const UsersLayout3 = lazy(() => import("../views/users-layout-3/Main"));

const ProfileOverview1 = lazy(() => import("../views/profile-overview-1/Main"));
const ProfileOverview2 = lazy(() => import("../views/profile-overview-2/Main"));
const ProfileOverview3 = lazy(() => import("../views/profile-overview-3/Main"));

const WizardLayout1 = lazy(() => import("../views/wizard-layout-1/Main"));
const WizardLayout2 = lazy(() => import("../views/wizard-layout-2/Main"));
const WizardLayout3 = lazy(() => import("../views/wizard-layout-3/Main"));

const BlogLayout1 = lazy(() => import("../views/blog-layout-1/Main"));
const BlogLayout2 = lazy(() => import("../views/blog-layout-2/Main"));
const BlogLayout3 = lazy(() => import("../views/blog-layout-3/Main"));

const PricingLayout1 = lazy(() => import("../views/pricing-layout-1/Main"));
const PricingLayout2 = lazy(() => import("../views/pricing-layout-2/Main"));

const InvoiceLayout1 = lazy(() => import("../views/invoice-layout-1/Main"));
const InvoiceLayout2 = lazy(() => import("../views/invoice-layout-2/Main"));

const FaqLayout1 = lazy(() => import("../views/faq-layout-1/Main"));
const FaqLayout2 = lazy(() => import("../views/faq-layout-2/Main"));
const FaqLayout3 = lazy(() => import("../views/faq-layout-3/Main"));

const Login = lazy(() => import("../views/login/Main"));
const Register = lazy(() => import("../views/register/Main"));
const ErrorPage = lazy(() => import("../views/error-page/Main"));

const Profile = lazy(() => import("../views/profile/profile"));
const UpdateProfile = lazy(() => import("../views/update-profile/Main"));
const ChangePassword = lazy(() => import("../views/change-password/Main"));

const RegularTable = lazy(() => import("../views/regular-table/Main"));
const Tabulator = lazy(() => import("../views/tabulator/Main"));
const Modal = lazy(() => import("../views/modal/Main"));
const SlideOver = lazy(() => import("../views/slide-over/Main"));
const Notification = lazy(() => import("../views/notification/Main"));
const Tab = lazy(() => import("../views/tab/Main"));
const Accordion = lazy(() => import("../views/accordion/Main"));
const Button = lazy(() => import("../views/button/Main"));
const Alert = lazy(() => import("../views/alert/Main"));
const ProgressBar = lazy(() => import("../views/progress-bar/Main"));
const Tooltip = lazy(() => import("../views/tooltip/Main"));
const Dropdown = lazy(() => import("../views/dropdown/Main"));
const Typography = lazy(() => import("../views/typography/Main"));
const Icon = lazy(() => import("../views/icon/Main"));
const LoadingIcon = lazy(() => import("../views/loading-icon/Main"));

const RegularForm = lazy(() => import("../views/regular-form/Main"));
const Datepicker = lazy(() => import("../views/datepicker/Main"));
const TomSelect = lazy(() => import("../views/tom-select/Main"));
const FileUpload = lazy(() => import("../views/file-upload/Main"));
const WysiwygEditor = lazy(() => import("../views/wysiwyg-editor/Main"));
const Validation = lazy(() => import("../views/validation/Main"));

const Chart = lazy(() => import("../views/chart/Main"));
const Slider = lazy(() => import("../views/slider/Main"));
const ImageZoom = lazy(() => import("../views/image-zoom/Main"));

const Settings = lazy(() => import("../views/settings/Main"));
const WeeklyPlanForm = lazy(() => import("../views/post/Main"));
const MealPlanDetail = lazy(() => import("../views/transaction-detail/meal-plan-detail"));
const Ingredients = lazy(() => import("../views/product-list/ingredents"));
const RecipeConfiguration = lazy(() => import("../views/product-list/Main"));
const MealPlan = lazy(() => import("../views/product-list/meal-plan"));
const RecipeSettings = lazy(() => import("../views/crud-form/Main"));

const AddCoupon = lazy(() => import("../views/settings/add-coupon"));
const SocialLinks = lazy(() => import("../views/product-list/socialLinks"));
const AddLinks = lazy(() => import("../views/settings/add-links"));

const Users = lazy(() => import("../views/product-list/users"));
const AddUsers = lazy(() => import("../views/settings/add-users"));

const ADDPLANS = lazy(() => import("../views/settings/add-plans"));
const Plans = lazy(() => import("../views/product-list/plans"));

const UserDetail = lazy(() => import("../views/transaction-detail/user-detail"));

const FAQ = lazy(() => import("../components/static-pages/faq"));
const TermsCondition = lazy(() => import("../components/static-pages/terms&condition"));
const PrivacyPolicy = lazy(() => import("../components/static-pages/privacy-policy"));
const ContactQueries = lazy(() => import("../components/static-pages/conatct-queries"));

const ReferralBanner = lazy(() => import("../components/referral-banner/referral-banner"));

const LandingPageCategory = lazy(() => import("../views/landing-page/landing-page"));
const LandingPage = lazy(() => import("../views/landing-page/landingPage"));

const EmailTemplates = lazy(() => import("../views/email-template-list/emails"));

const RecipesIdeas = lazy(() => import("../components/static-pages/recipes-ideas"));

const Newsletter = lazy(() => import("../views/product-list/newsletter"));

const Sms = lazy(() => import("../views/settings/sms"));

const MealPlanRestrictions = lazy(() => import("../views/settings/meal-plan-restrictions"));

const RecipeAnalytics = lazy(() => import("../views/recipe-analytics/recipe-analytics"));
const UserAnalytics = lazy(() => import("../views/user-analytics/user-analytics"));
const MealAnalytics = lazy(() => import("../views/meal-analytics/meal-analytics"));

const ModifyTooltip = lazy(() => import("../views/modify-tooltip/modify-tooltip"));

const HowItWorks = lazy(() => import("../components/static-pages/how-it-works"));
const HowReferralWorks = lazy(() => import("../components/static-pages/how-referral-works"));
const AboutUs = lazy(() => import("../components/static-pages/about-us"));

const LandingBanner = lazy(() => import("../components/landingBanner/landingBanner"));

const CancellationReason = lazy(() => import("../views/cancellation-reason/cancellation"));
const AddCancellationReason = lazy(() => import("../views/cancellation-reason/add-cancellation"));

const TopItems = lazy(() => import("../views/top-50-items/top-50-items"));

const HearAboutUs = lazy(() => import("../views/hear-about-us/hear-about-us"));
const AddHearAboutUs = lazy(() => import("../views/hear-about-us/add-hear-about-us"));

const LookingFor = lazy(() => import("../views/looking-for/looking-for"));
const AddlookingFor = lazy(() => import("../views/looking-for/add-looking-for"));

const UnPaidManagement = lazy(() => import("../views/unpaid-payment/unpaid-payment"));

const SMSTemplates = lazy(() => import("../views/sms-template/sms-template"));

const ManagePromotion = lazy(() => import("../views/settings/sms"));

const UserActivityTracking = lazy(() => import("../views/user-activity-tracking/user-activity-tracking"));

const SuccessBanner = lazy(() => import("../views/success-banner/success-banner"));

const MealStyleOption = lazy(() => import("../views/recipe-option/meal-style"));
const AddMealStyleDropdown = lazy(() => import("../views/recipe-option/add-meal-style"));
const CategoryOption = lazy(() => import("../views/recipe-option/category"));
const AddCategoryDropdown = lazy(() => import("../views/recipe-option/add-category"));
const AddProteinTypeDropdown = lazy(() => import("../views/recipe-option/add-protein-type"));
const ProteinTypeOption = lazy(() => import("../views/recipe-option/protein-type"));
const DietaryRestrictionOption = lazy(() => import("../views/recipe-option/dietary-restriction"));
const AddDietaryRestrictionDropdown = lazy(() => import("../views/recipe-option/add-dietary-restriction"));
const PreparationOption = lazy(() => import("../views/recipe-option/preparation"));
const AddPreparationDropdown = lazy(() => import("../views/recipe-option/add-preparation"));

const ReviewsTable = lazy(() => import("../views/product-list/reviews"));

const Artists = lazy(() => import("../views/artists"));
const AddArtists = lazy(() => import("../views/artists/add-artists"));

const Questions = lazy(() => import("../views/product-list/questions"));

const TravelReflections = lazy(() => import("../views/product-list/travel-reflections"));
const DesignInspirations = lazy(() => import("../views/product-list/designInspirations"));
const InspiredMoments = lazy(() => import("../views/product-list/inspiredMoments"));
const DistinctStyle = lazy(() => import("../views/product-list/distinctStyle"));

const ArtistDetails = lazy(() => import("../views/product-list/artist-details"));
const ArtistMatched = lazy(() => import("../views/product-list/artist-matched"));
const VibeMatches = lazy(() => import("../views/product-list/vibe-matches"));

const Templates = lazy(() => import("../views/templates"));
const AddTemplates = lazy(() => import("../views/templates/add-template"));

const Items = lazy(() => import("../views/product-list/Items"));
const AddItems = lazy(() => import("../views/settings/add-items"));

const Testimonials = lazy(() => import("../views/product-list/Testimonials"));
const Reviews = lazy(() => import("../views/product-list/reviews"));
const Blogs = lazy(() => import("../views/product-list/Blogs"));

const AddTestimonial = lazy(() => import("../views/settings/add-testimonial"));
const AddBlog = lazy(() => import("../views/settings/add-blog"));

const WebsiteSettings = lazy(() => import("../views/settings/websiteSettings"));

const UserDetails = lazy(() => import("../components/user-detail/UserDetails"));

const Couriers = lazy(() => import("../views/product-list/Couriers"));
const AddCouriers = lazy(() => import("../views/settings/Add-Couriers"));
const CourierDetails = lazy(() => import("../components/user-detail/Courier-Details"));

const Jobs = lazy(() => import("../views/product-list/Jobs"));
const JobDetails = lazy(() => import("../views/product-list/Job-Details"));

const TimeSlots = lazy(() => import("../views/product-list/TimeSlots"));
const AddTimeSlot = lazy(() => import("../views/settings/Add-TimSlots"));

const Payments = lazy(() => import("../views/product-list/CourierPayments"));

const DistancePrices = lazy(() => import("../views/product-list/DistancePrices"));

const AllAdmin = lazy(() => import("../views/all-admin/Main"));

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <SideMenu />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          // element: <DashboardOverview4 />,
          element: <DashboardOverview1 />,
        },
        {
          path: "/add-ingredients",
          // element: <DashboardOverview4 />,
          element: <Settings />,
        },
        {
          path: "/all-admin",
          element: <AllAdmin />,
        },
        {
          path: "/add-coupon",
          // element: <DashboardOverview4 />,
          element: <AddCoupon />,
        },
        {
          path: "/add-socialLinks",
          // element: <DashboardOverview4 />,
          element: <AddLinks />,
        },
        {
          path: "ingredients",
          element: <Ingredients />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "couriers",
          element: <Couriers />,
        },
        {
          path: "/testimonials",
          element: <Testimonials />,
        },
        {
          path: "/reviews",
          element: <Reviews />,
        },
        {
          path: "/add-testimonial",
          element: <AddTestimonial />,
        },
        {
          path: "/add-timeslots",
          element: <AddTimeSlot />,
        },
        {
          path: "/time-slots",
          element: <TimeSlots />,
        },
        {
          path: "/courier-payments",
          element: <Payments />,
        },
        {
          path: "/distance-prices",
          element: <DistancePrices />,
        },
        {
          path: "/items",
          element: <Items />,
        },
        {
          path: "/add-items",
          element: <AddItems />,
        },


        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/add-blog",
          element: <AddBlog />,
        },
        {
          path: "/website-settings",
          element: <WebsiteSettings />,
        },
        {
          path: "questions-detail/:userId",
          element: <Questions />,
        },
        {
          path: "artist-matched",
          element: <ArtistMatched />,
        },
        {
          path: "artist-who-get-my-vibe",
          element: <VibeMatches />,
        },
        {
          path: "your-design-inspirations/:userId",
          element: <DesignInspirations />,
        },
        {
          path: "your-travel-reflections/:userId",
          element: <TravelReflections />,
        },
        {
          path: "moments-that-inspire-you/:userId",
          element: <InspiredMoments />,
        },
        {
          path: "owning-your-distinctive-style/:userId",
          element: <DistinctStyle />,
        },
        {
          path: "artists",
          element: <Artists />,
        },
        {
          path: "templates",
          element: <Templates />,
        },
        {
          path: "/user-activity-tracking",
          element: <UserActivityTracking />,
        },
        {
          path: "add-users",
          element: <AddUsers />,
        },
        {
          path: "add-couriers",
          element: <AddCouriers />,
        },
        {
          path: "add-artists",
          element: <AddArtists />,
        },
        {
          path: "add-templates",
          element: <AddTemplates />,
        },
        {
          path: "reviews",
          element: <ReviewsTable />,
        },
        {
          path: "add-recipes",
          element: <RecipeSettings />,
        },
        {
          path: "plans",
          element: <Plans />,
        },
        {
          path: "jobs",
          element: <Jobs />,
        },
        {
          path: "job-details/:id",
          element: <JobDetails />,
        },
        {
          path: "add-plans",
          element: <ADDPLANS />,
        },
        {
          path: "user-detail/:id",
          element: <UserDetails />,
        },
        {
          path: "courier-detail/:id",
          element: <CourierDetails />,
        },
        {
          path: "artist-detail/:id",
          element: <ArtistDetails />,
        },
        {
          path: "faq",
          element: <FAQ />,
        },
        {
          path: "terms-condition",
          element: <TermsCondition />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "how-it-works",
          element: <HowItWorks />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "how-referral-works",
          element: <HowReferralWorks />,
        },
        {
          path: "contact-queries",
          element: <ContactQueries />,
        },
        {
          path: "recipes-ideas",
          element: <RecipesIdeas />,
        },
        {
          path: "referral-banner",
          element: <ReferralBanner />,
        },
        {
          path: "landing-banner",
          element: <LandingBanner />,
        },
        {
          path: "success-banner",
          element: <SuccessBanner />,
        },
        {
          path: "landing-page",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardOverview1 />,
        },
        {
          path: "/landing-page/category",
          element: <LandingPageCategory />,
        },
        {
          path: "email-templates",
          element: <EmailTemplates />,
        },
        {
          path: "sms-templates",
          element: <SMSTemplates />,
        },
        {
          path: "newsletter-management",
          element: <Newsletter />,
        },
        {
          path: "unpaid-payment-management",
          element: <UnPaidManagement />,
        },
        {
          path: "manage-promotion",
          element: <ManagePromotion />,
        },
        {
          path: "recipe-analytics",
          element: <RecipeAnalytics />,
        },
        {
          path: "meal-analytics",
          element: <MealAnalytics />,
        },
        {
          path: "user-analytics",
          element: <UserAnalytics />,
        },

        {
          path: "meal-plan-restrictions",
          element: <MealPlanRestrictions />,
        },
        {
          path: "top-50-items",
          element: <TopItems />,
        },
        {
          path: "meal-style-option",
          element: <MealStyleOption />,
        },
        {
          path: "add-meal-style-option",
          element: <AddMealStyleDropdown />,
        },
        {
          path: "category-option",
          element: <CategoryOption />,
        },
        {
          path: "add-category-option",
          element: <AddCategoryDropdown />,
        },
        {
          path: "protein-type-option",
          element: <ProteinTypeOption />,
        },
        {
          path: "add-protein-type",
          element: <AddProteinTypeDropdown />,
        },
        {
          path: "dietary-restriction",
          element: <DietaryRestrictionOption />,
        },
        {
          path: "add-dietary-restriction",
          element: <AddDietaryRestrictionDropdown />,
        },
        {
          path: "preparation-type",
          element: <PreparationOption />,
        },
        {
          path: "add-preparation-type",
          element: <AddPreparationDropdown />,
        },

        {
          path: "view-recipe",
          element: <TransactionDetail />,
        },
        {
          path: "meal-plan-detail",
          element: <MealPlanDetail />,
        },
        ,


        {
          path: "meal-plan",
          element: <MealPlan />,
        },


        {
          path: "add-meal-plan/:id?",
          element: <WeeklyPlanForm />,
        },
        {
          path: "recipes",
          element: <RecipeConfiguration />,
        },
        {
          path: "socialLinks",
          element: <SocialLinks />,
        },
        {
          path: "cancellation-reason",
          element: <CancellationReason />,
        },
        {
          path: "hear-about-us",
          element: <HearAboutUs />,
        },
        {
          path: "looking-for",
          element: <LookingFor />,
        },
        {
          path: "add-cancellation-reason",
          element: <AddCancellationReason />,
        },
        {
          path: "add-hear-about-us",
          element: <AddHearAboutUs />,
        },
        {
          path: "add-looking-for",
          element: <AddlookingFor />,
        },
        {
          path: "modify-tooltips",
          element: <ModifyTooltip />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "icon",
          element: <Icon />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

const element = useRoutes(routes);


return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Loading...
        </div>
      }
    >
      {element}
    </Suspense>
  );

  
}

export default Router;
