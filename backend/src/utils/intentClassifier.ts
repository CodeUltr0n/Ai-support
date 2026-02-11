export type Intent = 
'ORDER' |
'SUPPORT' |
'BILLING' |
'GENERAL';

export function classifyingIntent(message:string) {
    const text = message.toLowerCase();

    if(
        text.includes('refund') ||
        text.includes('charge') ||
        text.includes('invoice') ||
        text.includes('payment') ||
        text.includes('card') ||
        text.includes('bill')
    ) {
        return 'BILLING';
    }

    if(
        text.includes('order') ||
        text.includes('deleviery') ||
        text.includes('shipment') ||
        text.includes('tracking')
    ) {
        return 'ORDER';
    }

    if(
        text.includes('help')||
        text.includes('issue')||
        text.includes('problem')||
        text.includes('support') 
    )
    {
        return 'SUPPORT';
    }

    return 'GENERAL';
}
