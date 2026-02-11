type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  orders: Array<{
    id: string;
    status: string;
    totalAmount: number;
    items: Array<{
      quantity: number;
      price: number;
    }>;
  }>;
} | null;

type BillingAgentInput = {
  message: string;
  userProfile: UserProfile;
};

export async function billingAgent({ message, userProfile }: BillingAgentInput) {
  return generateBillingResponse(message, userProfile);
}

function generateBillingResponse(
  message: string,
  profile: UserProfile
): string {
  const lowerMessage = message.toLowerCase();

  // Refunds
  if (lowerMessage.includes('refund') || lowerMessage.includes('return') || lowerMessage.includes('money back')) {
    return "Refunds are processed within 5-7 business days after we receive the returned item. If you would like to initiate a return, please go to your Orders page.";
  }

  // Invoices / Receipts
  if (lowerMessage.includes('invoice') || lowerMessage.includes('receipt') || lowerMessage.includes('bill')) {
    if (!profile?.orders?.length) {
        return "I don't see any recent orders to generate an invoice for.";
    }
    const latestOrder = profile.orders[0];
    if (!latestOrder) {
        return "I don't see any recent orders to generate an invoice for.";
    }
    return `I can generate an invoice for your latest order (Order ID: ${latestOrder.id}) amounting to ₹${latestOrder.totalAmount}. Would you like me to email it to ${profile.email}?`;
  }

  // Payment Issues
  if (lowerMessage.includes('payment') || lowerMessage.includes('card') || lowerMessage.includes('charge')) {
      return "For payment security, we do not handle credit card details in chat. Please verify your payment method in your Account Settings.";
  }

  return "I am the Billing Agent. I can assist with refunds, invoices, and payment inquiries. How can I help?";
}
