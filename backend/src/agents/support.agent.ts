type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  orders: Array<{
    id: string;
    items: Array<{
      product: {
        name: string;
      };
    }>;
  }>;
} | null;

type SupportAgentInput = {
  message: string;
  userProfile: UserProfile;
};

export async function supportAgent({ message, userProfile }: SupportAgentInput) {
  return generateResponse(message, userProfile);
}

function generateResponse(
  message: string,
  profile: UserProfile
): string {
  const lowerMessage = message.toLowerCase();

  // Check for product queries
  if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
    if (profile?.orders.length) {
      const allProducts = profile.orders.flatMap((o) =>
        o.items.map((i) => i.product.name)
      );
      const uniqueProducts = [...new Set(allProducts)];
      return `Based on your order history, you've purchased: ${uniqueProducts.join(', ')}. How can I help you with these products?`;
    }
    return "I don't see any products in your order history. Is there something specific you'd like to know about our products?";
  }

  // General help
  if (lowerMessage.includes('help')) {
      return "I can help with general inquiries, account issues, and product information. For specific order or billing questions, I can direct you to the right agent.";
  }

  // Default helpful response
  return `Hello${profile?.name ? ` ${profile.name}` : ''}! I'm the Support Agent here to help you with:\n- Product information\n- General inquiries\n\nFor Order status or Billing, please ask specifically about those topics.`;
}
