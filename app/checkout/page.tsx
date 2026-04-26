"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ShoppingBag, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { CustomerDetailsForm } from "@/components/checkout/checkout-form";
import { site } from "@/lib/site-config";
import Link from "next/link";

interface CartItem {
  _id: string;
  selectedSize: string;
  price: number;
  image?: string;
  imageUrl?: string;
  images?: Array<{ asset: { url: string } }>;
  buyOneGetOne?: boolean;
  freeProduct?: CartItem;
}

type CheckoutStep = "payment" | "details";

const getProductImageUrl = (product: any): string => {
  if (!product) return "/placeholder-image.jpg";
  let url = product.image || product.imageUrl || product.images?.[0]?.asset?.url || product.images?.[0]?.url || "";
  if (!url) return "/placeholder-image.jpg";
  if (url.includes("cloudinary.com")) return url.replace("/upload/", "/upload/w_200,h_200,q_50,f_auto/");
  return url;
};

const BASE_PRICE = 1499;
const COD_CHARGE = 300;

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState<"online" | "cod">("online");
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("payment");
  const [customerDetails, setCustomerDetails] = useState({
    name: "", contact1: "", contact2: "", address: "",
    district: "", state: "", pincode: "", landmark: "", instagramId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(Array.isArray(cart) ? cart : []);
    } catch { setCartItems([]); }
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentStep]);

  const mainProduct = cartItems[0];
  const freeProduct = mainProduct?.freeProduct;
  const pair1Extra = Math.max(0, (mainProduct?.price || BASE_PRICE) - BASE_PRICE);
  const pair2Extra = Math.max(0, (freeProduct?.price || BASE_PRICE) - BASE_PRICE);
  const subtotal = BASE_PRICE + pair1Extra + pair2Extra;
  const shippingCharge = shippingMethod === "online" ? 0 : COD_CHARGE;
  const totalAmount = subtotal + shippingCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
    if (formErrors.length > 0) setFormErrors([]);
  };

  const handleWhatsAppOrder = () => {
    setIsLoading(true);
    try {
      const productMessages = cartItems.map((item, idx) => {
        const extra = Math.max(0, (item.price || BASE_PRICE) - BASE_PRICE);
        let msg = `*PAIR ${idx + 1} :* https://magshoppy.in/p/${item._id}\nSize: ${item.selectedSize || "N/A"}`;
  
        if (item.buyOneGetOne && item.freeProduct) {
          const fExtra = Math.max(0, (item.freeProduct.price || BASE_PRICE) - BASE_PRICE);
          msg += `\n\n*PAIR ${idx + 2} :* https://magshoppy.in/p/${item.freeProduct._id}\nSize: ${item.freeProduct.selectedSize || "N/A"}`;
        }
        return msg;
      }).join("\n\n");
  
      const msg = `*ORDER CONFIRMATION – 2 PAIR COMBO*\n\n*CUSTOMER INFORMATION*\nName: ${customerDetails.name}\nInstagram ID: ${customerDetails.instagramId}\nAddress: ${customerDetails.address}\nDistrict: ${customerDetails.district}\nState: ${customerDetails.state}\nPincode: ${customerDetails.pincode}\nLandmark: ${customerDetails.landmark || "N/A"}\nPhone 1: ${customerDetails.contact1}\nAlternative Phone 2: ${customerDetails.contact2 || "N/A"}\n\n*PRODUCT DETAILS*\n\n${productMessages}\n\n*PAYMENT SUMMARY*\n- Product Price: ₹${BASE_PRICE + pair1Extra + pair2Extra}\n- Shipping: Free (Prepaid)\n\n*Total Amount Payable: ₹${totalAmount}✅`.trim();
  
      setTimeout(() => {
        window.open(`https://wa.me/${site.phone}?text=${encodeURIComponent(msg)}`, "_blank");
        localStorage.removeItem("cart");
        setIsLoading(false);
      }, 500);
    } catch {
      setIsLoading(false);
      setFormErrors(["Failed to create order. Please try again."]);
    }
  };

  if (!cartItems.length || !mainProduct) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Cart is empty</h2>
            <p className="text-sm text-muted-foreground mt-1">Add some shoes to get started</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem("cart"); router.push("/"); }}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="max-w-md mx-auto px-4 py-5 space-y-5">

        {/* Step progress */}
        <div className="flex items-center gap-2">
          {(["payment", "details"] as CheckoutStep[]).map((step, i) => {
            const labels = ["Payment", "Delivery"];
            const stepIdx = ["payment", "details"].indexOf(currentStep);
            const isDone = stepIdx > i;
            const isActive = currentStep === step;
            return (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all
                    ${isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {labels[i]}
                  </span>
                </div>
                {i < 1 && (
                  <div className={`flex-1 h-px transition-colors ${isDone ? "bg-green-500" : "bg-border"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {formErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              <ul className="list-disc list-inside space-y-0.5 text-sm">
                {formErrors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* STEP 1: Payment */}
        {currentStep === "payment" && (
          <>
            {/* Pair cards */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Your Pairs</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { product: mainProduct, label: "1st Pair", accent: "ring-blue-500 ring-2" },
                  ...(freeProduct ? [{ product: freeProduct, label: "2nd Pair", accent: "ring-green-500 ring-2" }] : [])
                ].map(({ product, label, accent }) => (
                  <div key={product._id} className={`rounded-2xl overflow-hidden bg-muted/40 border border-border ${accent}`}>
                    <div className="aspect-square relative bg-muted">
                      <Image
                        src={getProductImageUrl(product)}
                        alt={"MagShoppy Sneakers"}
                        fill className="object-cover"
                        quality={60}
                      />
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <p className="text-xs font-medium leading-tight line-clamp-2">Sneaker</p>
                      <p className="text-xs text-muted-foreground">Size {product.selectedSize}</p>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1
                        ${label === "1st Pair" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"}`}>
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Payment Method</p>
              <div className="space-y-2.5">
                {/* Online */}
                <button
                  onClick={() => setShippingMethod("online")}
                  className={`w-full text-left rounded-2xl border p-4 transition-all
                    ${shippingMethod === "online"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                      : "border-border bg-card hover:border-muted-foreground/30"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${shippingMethod === "online" ? "border-blue-500" : "border-muted-foreground"}`}>
                      {shippingMethod === "online" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">Online Payment</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                          Free shipping
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Save ₹{COD_CHARGE} · Fast delivery in 5–7 days</p>
                    </div>
                  </div>
                </button>

                {/* COD */}
                <button
                  onClick={() => setShippingMethod("cod")}
                  className={`w-full text-left rounded-2xl border p-4 transition-all
                    ${shippingMethod === "cod"
                      ? "border-orange-400 bg-orange-50 dark:bg-orange-950/30"
                      : "border-border bg-card hover:border-muted-foreground/30"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${shippingMethod === "cod" ? "border-orange-400" : "border-muted-foreground"}`}>
                      {shippingMethod === "cod" && <div className="w-2 h-2 rounded-full bg-orange-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">Cash on Delivery</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                          +₹{COD_CHARGE}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Pay when your order arrives</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Order Summary</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base (2 pairs)</span>
                  <span>₹{BASE_PRICE}</span>
                </div>
                {pair1Extra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground pl-3">↳ Pair 1 extra</span>
                    <span>+₹{pair1Extra}</span>
                  </div>
                )}
                {pair2Extra > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground pl-3">↳ Pair 2 extra</span>
                    <span>+₹{pair2Extra}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shippingMethod === "online"
                    ? <span className="text-green-600 font-semibold text-xs">FREE</span>
                    : <span>₹{COD_CHARGE}</span>}
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
              {shippingMethod === "online" && (
                <p className="text-xs text-green-600 font-medium pt-1">
                  You're saving ₹{COD_CHARGE} with online payment 🎉
                </p>
              )}
            </div>

            <div className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our{" "}
              <Link href="/T&C" className="underline underline-offset-2 text-foreground">Terms & Conditions</Link>
            </div>

            <button
              onClick={() => setCurrentStep("details")}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
            >
              Continue to Delivery <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* STEP 2: Details */}
        {currentStep === "details" && (
          <>
            <button
              onClick={() => setCurrentStep("payment")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to payment
            </button>

            <div className="rounded-2xl border border-border bg-card p-4">
              <CustomerDetailsForm customerDetails={customerDetails} handleInputChange={handleInputChange} />
            </div>

            {/* Compact summary */}
            <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  {shippingMethod === "online" ? "Online Payment · Free shipping" : `Cash on Delivery · +₹${COD_CHARGE}`}
                </p>
                <p className="text-lg font-bold">₹{totalAmount}</p>
              </div>
              <div className="flex gap-1.5">
                {[mainProduct, freeProduct].filter(Boolean).map((p, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg overflow-hidden bg-muted border border-border">
                    <Image src={getProductImageUrl(p)} alt="" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed CTA for details step */}
      {currentStep === "details" && (
        <div className="fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="max-w-md mx-auto space-y-2">
            <button
              onClick={handleWhatsAppOrder}
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Preparing order...</>
              ) : (
                <>Order via WhatsApp · ₹{totalAmount}</>
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground">You'll be redirected to WhatsApp to confirm</p>
          </div>
        </div>
      )}
    </main>
  );
}