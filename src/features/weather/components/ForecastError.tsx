import { StateMessage } from '../../../shared/ui/StateMessage';

export function ForecastError({ onRetry }: { onRetry: () => void }) {
  return (
    <StateMessage
      icon="wifiOff"
      title="Couldn't load the forecast"
      message="Check your internet connection, then try again."
      tone="danger"
      action={{
        label: 'Try Again',
        icon: 'refresh',
        onPress: onRetry,
      }}
    />
  );
}
