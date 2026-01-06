import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/new-listing/page";

export default function DetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  return (
    <div className="space-y-8 2xl:mx-20 mx-5">
      <h2 className="text-2xl font-semibold text-gray-900">Property Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">
            Bedrooms
          </label>
          <input
            type="text"
            id="bedrooms"
            placeholder="e.g. 3"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("bedrooms")}
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium mb-2">
            Bathrooms
          </label>
          <input
            type="text"
            id="bathrooms"
            placeholder="e.g. 2"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("bathrooms")}
          />
        </div>
        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium mb-2">
            Year Built
          </label>
          <input
            type="text"
            id="yearBuilt"
            placeholder="e.g. 2000"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("yearBuilt")}
          />
        </div>
        <div></div> 
        <div>
          <label htmlFor="area" className="block text-sm font-medium mb-2">
            Area (sq M)
          </label>
          <input
            type="text"
            id="area"
            placeholder="e.g. 2000"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("area")}
          />
        </div>
        <div>
          <label htmlFor="lotSize" className="block text-sm font-medium mb-2">
            Lot Size (sq M)
          </label>
          <input
            type="text"
            id="lotSize"
            placeholder="e.g. 5000"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("lotSize")}
          />
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mt-10">
        <label className="block text-sm font-medium mb-2">Amenities</label>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.pool")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Pool
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.garden")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Garden
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.parking")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Parking
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.airConditioning")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Air Conditioning
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.gym")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Gym
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.security")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Security
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.oceanView")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Ocean View
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.mountainView")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Mountain View
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.beachAccess")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Beach Access
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.rooftopTerrace")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Rooftop Terrace
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.balcony")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Balcony
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("amenities.petFriendly")}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                Pet Friendly
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
