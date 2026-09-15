import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomerDetailsFormProps {
  customerDetails: {
    name: string;
    contact1: string;
    contact2: string;
    address: string;
    district: string;
    state: string;
    instagramId: string;
    pincode: string;
    landmark: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleInputBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  getFieldError: (field: string) => string | undefined;
}

export const CustomerDetailsForm = ({
  customerDetails,
  handleInputChange,
  handleInputBlur,
  getFieldError,
}: CustomerDetailsFormProps) => (
  <div className="space-y-4">
    {/* Name */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={customerDetails.name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="mt-1"
        />
        {getFieldError("name") && (
          <p className="text-xs text-red-500 mt-1">{getFieldError("name")}</p>
        )}
      </div>
    </div>

    {/* Contact Numbers */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="contact1">Primary Phone *</Label>
        <Input
          id="contact1"
          name="contact1"
          placeholder="10-digit mobile number"
          value={customerDetails.contact1}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          maxLength={10}
          inputMode="numeric"
          className="mt-1"
        />
        {getFieldError("contact1") && (
          <p className="text-xs text-red-500 mt-1">{getFieldError("contact1")}</p>
        )}
      </div>
      <div>
        <Label htmlFor="contact2">Secondary Phone (Optional)</Label>
        <Input
          id="contact2"
          name="contact2"
          placeholder="Alternative number"
          value={customerDetails.contact2}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
    </div>

    {/* Instagram */}
    <div>
      <Label htmlFor="instagramId">Instagram Username (Optional)</Label>
      <Input
        id="instagramId"
        name="instagramId"
        placeholder="@yourusername"
        value={customerDetails.instagramId}
        onChange={handleInputChange}
        className="mt-1"
      />
    </div>

    {/* Address */}
    <div>
      <Label htmlFor="address">Complete Address *</Label>
      <Textarea
        id="address"
        name="address"
        placeholder="House no, Building, Street, Area"
        value={customerDetails.address}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="mt-1 min-h-[80px]"
      />
      {getFieldError("address") && (
        <p className="text-xs text-red-500 mt-1">{getFieldError("address")}</p>
      )}
    </div>

    {/* Landmark */}
    <div>
      <Label htmlFor="landmark">Landmark (Optional)</Label>
      <Input
        id="landmark"
        name="landmark"
        placeholder="Nearby famous place, shop, or building"
        value={customerDetails.landmark}
        onChange={handleInputChange}
        className="mt-1"
      />
    </div>

    {/* District & State */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="district">District *</Label>
        <Input
          id="district"
          name="district"
          placeholder="Your district"
          value={customerDetails.district}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="mt-1"
        />
        {getFieldError("district") && (
          <p className="text-xs text-red-500 mt-1">{getFieldError("district")}</p>
        )}
      </div>
      <div>
        <Label htmlFor="state">State *</Label>
        <Input
          id="state"
          name="state"
          placeholder="Your state"
          value={customerDetails.state}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="mt-1"
        />
        {getFieldError("state") && (
          <p className="text-xs text-red-500 mt-1">{getFieldError("state")}</p>
        )}
      </div>
    </div>

    {/* Pincode */}
    <div>
      <Label htmlFor="pincode">Pincode *</Label>
      <Input
        id="pincode"
        name="pincode"
        placeholder="6-digit pincode"
        value={customerDetails.pincode}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        maxLength={6}
        inputMode="numeric"
        className="mt-1"
      />
      {getFieldError("pincode") && (
        <p className="text-xs text-red-500 mt-1">{getFieldError("pincode")}</p>
      )}
    </div>
  </div>
);