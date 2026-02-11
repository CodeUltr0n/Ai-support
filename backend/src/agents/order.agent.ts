type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  orders: Array<{
    id: string;
    status: string;
    totalAmount: number;
    trackingNumber: string | null;
    shippingAddress: string | null;
    createdAt: Date;
    items: Array<{
      quantity: number;
      price: number;
      product: {
        name: string;
        description: string | null;
      };
    }>;
  }>;
} | null;

type OrderAgentInput = {
  message: string;
  userProfile: UserProfile;
};

export async function orderAgent({ message, userProfile }: OrderAgentInput) {
  const context = buildOrderContext(userProfile);
  return generateOrderResponse(message, context, userProfile);
}

function buildOrderContext(profile: UserProfile): string {
  if (!profile) return 'No user profile found.';

  const orderSummary = profile.orders.map((order) => {
    const items = order.items
      .map((item) => `${item.quantity}x ${item.product.name}`)
      .join(', ');
    return `- Order ${order.id}: ${order.status}, ${items} (Tracking: ${order.trackingNumber || 'N/A'})`;
  }).join('\n');

  return `User Orders:\n${orderSummary}`;
}

function generateOrderResponse(
  message: string,
  context: string,
  profile: UserProfile
): string {
  const lowerMessage = message.toLowerCase();

  // Order Status & Where is my order
  if (lowerMessage.includes('status') || lowerMessage.includes('where') || lowerMessage.includes('track')) {
    if (!profile?.orders?.length) {
      return "I couldn't find any orders specifically associated with your account.";
    }
    const latestOrder = profile.orders[0]!;
    const items = latestOrder.items.map((i) => i.product.name).join(', ');
    let statusMsg = `Your latest order (${items}) is **${latestOrder.status}**.`;
    
    if (latestOrder.trackingNumber) {
        statusMsg += ` Tracking Number: ${latestOrder.trackingNumber}`;
    }
    
    if (latestOrder.status === 'SHIPPED') statusMsg += " It's on the way!";
    else if (latestOrder.status === 'PROCESSING') statusMsg += " We're getting it ready.";
    else if (latestOrder.status === 'DELIVERED') statusMsg += " It has been delivered.";
    
    return statusMsg;
  }

  // Cancel Order
  if (lowerMessage.includes('cancel')) {
      return "I can help with cancellations. Please provide the Order ID you wish to cancel. Note that orders can only be cancelled within 24 hours of placement.";
  }

  // Modify Order
  if (lowerMessage.includes('change') || lowerMessage.includes('modify')) {
      return "To modify an order, please contact our support team directly or cancel and place a new order if it's within the 24-hour window.";
  }

  return "I am the Order Agent. I can help you with order status, tracking, and cancellations. How can I assist?";
}
