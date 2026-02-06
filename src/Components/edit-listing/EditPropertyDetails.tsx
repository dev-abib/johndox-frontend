import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "@/app/seller/new-listing/page";

interface EditPropertyDetailsProps {
  data?: any;
}

export default function EditPropertyDetails({
  data: listing,
}: EditPropertyDetailsProps) {
  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useFormContext<ListingFormData>();

  useEffect(() => {
    if (listing) {
      const currentValues = getValues();

      const amenitiesObject: Record<string, boolean> = {};
      if (Array.isArray(listing.amenities)) {
        listing.amenities.forEach((item: string) => {
          const key = item.charAt(0).toLowerCase() + item.slice(1);
          amenitiesObject[key] = true;
        });
      }
      reset({
        ...currentValues,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        yearBuilt: listing.yearBuilt,
        area: listing.areaInMeter,
        lotSize: listing.areaInSqMeter,
        amenities: amenitiesObject,
      });
    }
  }, [listing, reset, getValues]);

  return (
    <div className="space-y-8 2xl:mx-20 mx-5">
      <h2 className="text-2xl font-semibold text-gray-900">Property Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("bedrooms")}
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("bathrooms")}
          />
        </div>
        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium mb-2">
            Year Built
          </label>
          <input
            type="number"
            id="yearBuilt"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("yearBuilt")}
          />
        </div>
        <div>{/* Empty div for grid alignment */}</div>
        <div>
          <label htmlFor="area" className="block text-sm font-medium mb-2">
            Area (sq M)
          </label>
          <input
            type="number"
            id="area"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("area")}
          />
        </div>
        <div>
          <label htmlFor="lotSize" className="block text-sm font-medium mb-2">
            Lot Size (sq M)
          </label>
          <input
            type="number"
            id="lotSize"
            className="w-full px-4 py-3 bg-[#F7F7F7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("lotSize")}
          />
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mt-10">
        <label className="block text-sm font-medium mb-2">Amenities</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "pool", label: "Pool" },
            { id: "garden", label: "Garden" },
            { id: "parking", label: "Parking" },
            { id: "airConditioning", label: "Air Conditioning" },
            { id: "gym", label: "Gym" },
            { id: "security", label: "Security" },
            { id: "oceanView", label: "Ocean View" },
            { id: "mountainView", label: "Mountain View" },
            { id: "beachAccess", label: "Beach Access" },
            { id: "rooftopTerrace", label: "Rooftop Terrace" },
            { id: "balcony", label: "Balcony" },
            { id: "petFriendly", label: "Pet Friendly" },
          ].map(amenity => (
            <label
              key={amenity.id}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register(`amenities.${amenity.id}` as any)}
              />
              <span className="lg:text-lg md:text-base text-sm text-gray-700">
                {amenity.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
