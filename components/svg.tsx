export function SiteLogo(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 111 25"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M11.6 11.4l4.1-2.1c1.6 4.3 3.2 8.7 4.6 12.9l-4.2 1.9c-.1-.2-.3-.6-.5-1.2s-.3-1-.4-1.4c-4.9.9-10 1.4-15.1 1.7L0 18.6c.6 0 1.3-.1 2.1-.1C3.7 13 5.1 7.2 6.3 1.1l4.5 1c-1 5.3-2.2 10.6-3.7 16 2.3-.3 4.5-.6 6.5-.9-.1-.7-.8-2.6-2-5.8zM24.1 16.6V9.2c.6.9 1.1 1.4 1.5 1.4h6.8V7.3c-1.3.1-3.3.1-5.9.1V2.8c3.7 0 6.6-.2 8.6-.5s4-.9 5.8-1.7l1.3 4.6c-1.7.8-3.5 1.4-5.3 1.7v3.7h5.4c.4 0 .9-.5 1.5-1.4v7.5c-.6-.9-1.1-1.4-1.5-1.4h-5.6c-.3 2.9-1.2 5.1-2.4 6.5s-3.3 2.4-6 3L27 20.2c1.7-.4 3-.9 3.7-1.6.7-.7 1.2-1.8 1.4-3.2h-6.6c-.2-.1-.7.3-1.4 1.2zM54.4 8.3c-2.1 0-4.3.1-6.5.1v-4c5.3 0 10.6-.2 16.1-.5l.1 4c-2.8.2-4.9.9-6.3 2-1.4 1.2-2.1 2.7-2.1 4.5 0 1.4.4 2.6 1.1 3.4.7.8 1.7 1.2 2.8 1.2.6 0 1.4-.1 2.4-.3l.4 4.1c-1 .2-2 .4-3 .4-2.4 0-4.2-.8-5.7-2.3-1.4-1.5-2.1-3.5-2.1-6.1 0-1.2.3-2.4.8-3.6s1.1-2.1 2-2.9zm8.2 5.8l-2.1 1.2c-.5-1.3-1.1-2.5-1.7-3.8l2.1-1.2c.7 1.3 1.2 2.6 1.7 3.8zm3.1-.7l-2.2 1.2c-.6-1.4-1.2-2.7-1.7-3.9L64 9.4c.5 1.1 1.1 2.4 1.7 4zM81.5.8l4.6 1.1c-.8 3.8-2.1 7.3-3.9 10.6 2 2.2 3.9 4.1 5.5 5.9l-2.9 4c-1.7-1.9-3.4-3.9-5.3-5.9-2.2 3-5 5.6-8.4 7.8L68.4 20c2.9-2.1 5.4-4.4 7.3-7-1.8-1.8-3.6-3.6-5.5-5.1l2.8-4c1.5 1.3 3.3 3 5.4 5 1.3-2.4 2.3-5.1 3.1-8.1zM103.8 19.3c1.7 0 3.5-.1 5.3-.3l.1 4.9c-2.2.2-4.3.3-6.4.3-2.2 0-3.8-.5-4.6-1.5s-1.2-3-1.2-5.8v-2.2h-4.3c-.4 0-.9.5-1.5 1.4V8.6c.6.9 1.1 1.4 1.5 1.4H97V6.5h-2.3c-.4 0-.9.5-1.5 1.4V.3c.6.9 1.1 1.4 1.5 1.4h12.8c.4 0 .9-.5 1.5-1.4v7.6c-.6-.9-1.1-1.4-1.5-1.4h-5.6V10h7.6c.4 0 .9-.5 1.5-1.4V16c-.6-.9-1.1-1.4-1.5-1.4h-7.6v2.1c0 1.1.1 1.8.3 2.1.2.3.8.5 1.6.5z"></path>
    </svg>
  );
}

export function HomeIcon(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

export function NewspaperIcon(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  );
}

export function NewIcon(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.7859 13.6125L21.0382 15.2996L21.2353 17.7297C21.2624 18.0614 21.0538 18.3651 20.7366 18.4578L18.4105 19.133L17.4644 21.3766C17.3347 21.683 17.0084 21.8574 16.6866 21.7882L14.3128 21.2986L12.4395 22.8422C12.3116 22.9474 12.1563 23 12 23C11.8437 23 11.6883 22.9474 11.5604 22.8422L9.68756 21.2986L7.31329 21.7882C6.99107 21.8583 6.66564 21.6825 6.53546 21.3766L5.58942 19.133L3.26328 18.4578C2.94701 18.3651 2.738 18.0614 2.76459 17.7297L2.96168 15.2996L1.21398 13.6125C0.975176 13.3827 0.931174 13.0149 1.10764 12.7348L2.40432 10.6758L1.63429 8.36385C1.52978 8.04867 1.66087 7.70304 1.94643 7.53737L4.04477 6.31912L4.4307 3.91306C4.48341 3.5845 4.75797 3.33947 5.08752 3.32608L7.50717 3.2301L8.95924 1.27951C9.15816 1.01417 9.51522 0.925104 9.81269 1.06816L11.9995 2.11567L14.1863 1.06816C14.4824 0.924642 14.8413 1.0137 15.0393 1.27951L16.4918 3.2301L18.9115 3.32608C19.241 3.33947 19.5156 3.5845 19.5697 3.9126L19.9556 6.31866L22.0539 7.53691C22.3395 7.70258 22.4697 8.04821 22.3661 8.36339L21.5965 10.6753L22.8927 12.7343C23.0687 13.0149 23.0247 13.3827 22.7859 13.6125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M5 8.70999H6.07705L7.49601 12.0804V8.70999H8.76111V15.71H7.72681L6.30784 12.0804V15.71H5V8.70999Z"
        fill="currentColor"
      />
      <path
        d="M9.87703 8.70999H12.9885V9.76431H11.4071V11.5013H12.6124V12.573H11.4071V14.6643H13.0056V15.71H9.87703V8.70999Z"
        fill="currentColor"
      />
      <path
        d="M13.5036 8.70999H14.8029L15.2132 12.789L15.7347 8.71863H16.7519L17.299 12.7631L17.7178 8.70999H19L18.1708 15.71H16.8374L16.2475 11.4841L15.6919 15.71H14.3413L13.5036 8.70999Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SaleIcon(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 1L17.5 7.28571L19.8571 4.14286C19.8571 4.14286 23 8.07143 23 13.5714C23 19.0714 18.2857 23 12 23C5.71429 23 1 19.0714 1 13.5714C1 8.07143 4.14286 4.14286 4.14286 4.14286L6.5 7.28571L12 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.14994 17C5.43637 17 4.90427 16.8291 4.55363 16.4874C4.20915 16.1401 4.02461 15.591 4 14.8403L5.41176 14.6471C5.41792 15.0784 5.47328 15.3894 5.57785 15.5798C5.68858 15.7647 5.8516 15.8571 6.0669 15.8571C6.34371 15.8571 6.48212 15.6919 6.48212 15.3613C6.48212 15.098 6.41446 14.8711 6.27912 14.6807C6.14994 14.4902 5.94387 14.2857 5.6609 14.0672L5.01499 13.5546C4.69512 13.3081 4.44598 13.0476 4.26759 12.7731C4.09535 12.493 4.00923 12.1625 4.00923 11.7815C4.00923 11.2101 4.19377 10.7703 4.56286 10.4622C4.9381 10.1541 5.45175 10 6.10381 10C6.81123 10 7.29104 10.1877 7.54325 10.563C7.80162 10.9384 7.94002 11.395 7.95848 11.9328L6.53749 12.0924C6.52518 11.7395 6.48827 11.4874 6.42676 11.3361C6.3714 11.1793 6.24529 11.1008 6.04844 11.1008C5.90696 11.1008 5.79623 11.1569 5.71626 11.2689C5.64245 11.3754 5.60554 11.4958 5.60554 11.6303C5.60554 11.8599 5.6609 12.0532 5.77163 12.2101C5.8885 12.3669 6.07305 12.5462 6.32526 12.7479L6.94348 13.2437C7.31257 13.5294 7.59862 13.8319 7.80162 14.1513C8.00461 14.4706 8.10611 14.8487 8.10611 15.2857C8.10611 15.605 8.02307 15.8964 7.85698 16.1597C7.69704 16.4174 7.46943 16.6218 7.17416 16.7731C6.87889 16.9244 6.53749 17 6.14994 17Z"
        fill="currentColor"
      />
      <path
        d="M9.42431 10.0924H11.3067L12.7 16.8992H11.1775L10.9283 15.4622H9.83031L9.57194 16.8992H8.01254L9.42431 10.0924ZM10.7715 14.563L10.3747 11.9076L9.97794 14.563H10.7715Z"
        fill="currentColor"
      />
      <path
        d="M12.9932 10.0924H14.6449V15.8824H16.3612V16.8992H12.9932V10.0924Z"
        fill="currentColor"
      />
      <path
        d="M16.6228 10.0924H19.9815V11.1176H18.2745V12.8067H19.5755V13.8487H18.2745V15.8824H20V16.8992H16.6228V10.0924Z"
        fill="currentColor"
      />
    </svg>
  );
}