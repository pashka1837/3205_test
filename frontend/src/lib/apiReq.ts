const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllUrls(): Promise<GetAllRes> {
  try {
    const res = await fetch(`${apiUrl}/getall`);
    return (await res.json()) as GetAllRes;
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function createUrl(data: CreateAliasDto): Promise<CreateAliasRes> {
  const expiresAt = Number(data.expiresAt)
    ? Number(data.expiresAt) * 60000 + Date.now()
    : null;

  try {
    const res = await fetch(`${apiUrl}/shorten`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...data,
        expiresAt,
      }),
    });

    return (await res.json()) as CreateAliasRes;
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function deleteUrl(alias: string): Promise<DeleteAliasRes> {
  try {
    const res = await fetch(`${apiUrl}/delete/${alias}`, {
      method: "DELETE",
    });
    if (res.ok && res.status === 204)
      return {
        success: true,
        message: "Deleted",
      };

    return await res.json();
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getInfo(alias: string): Promise<GetInfoRes> {
  try {
    const res = await fetch(`${apiUrl}/info/${alias}`);
    return await res.json();
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getAnal(alias: string): Promise<GetAnalRes> {
  try {
    const res = await fetch(`${apiUrl}/analytics/${alias}`);
    return await res.json();
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
