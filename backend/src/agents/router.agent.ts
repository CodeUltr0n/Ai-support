import * as orderTool from "../tools/order.tool.js";
import { classifyingIntent } from "../utils/intentClassifier.js";
import { supportAgent } from "./support.agent.js";
import { orderAgent } from "./order.agent.js";
import { billingAgent } from "./billing.agent.js";

export async function routeAgent(message: string, userId: string) {
  const intent = classifyingIntent(message);

  switch (intent) {
    case "ORDER": {
      if (message.toLowerCase().includes("all")) {
        const orders = await orderTool.getUserOrders(userId);
        return { intent, data: orders, responseType: "ORDER_LIST" };
      }

      const userProfile = await orderTool.getUserProfile(userId);
      const response = await orderAgent({ message, userProfile });
      return { intent, data: response, responseType: "ORDER_STATUS" };
    }

    case "BILLING": {
        const userProfile = await orderTool.getUserProfile(userId);
        const response = await billingAgent({ message, userProfile });
        return { intent, data: response, responseType: "BILLING" };
    }

    case "SUPPORT": {
      // Fetching user context for the support agent
      const userProfile = await orderTool.getUserProfile(userId);
      const response = await supportAgent({ message, userProfile });
      return { intent, data: response, responseType: "SUPPORT" };
    }

    default:
      return { intent, data: null, responseType: "GENERAL" };
  }
}
